<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ChevronDown, Minus, Plus, Search, ShoppingBag, Trash2, MessageCircle, X } from 'lucide-vue-next'
import ProductVisual from './ProductVisual.vue'
import type { CatalogueProduct, CartLine } from '../types'

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '27820000000'

const props = defineProps<{
  products: CatalogueProduct[]
  cartLines: CartLine[]
  cartCount: number
  cartTotal: number
  cartOpen: boolean
}>()

const emit = defineEmits<{
  'add-to-cart': [product: CatalogueProduct]
  'remove-from-cart': [productId: string]
  'clear-from-cart': [productId: string]
  'clear-cart': []
  'set-cart-open': [open: boolean]
}>()

const categories = computed(() => ['All', ...new Set(props.products.map((product) => product.category))])
const selectedCategory = defineModel<string>('category', { default: 'All' })
const searchQuery = ref('')
const customerName = ref('')
const customerPhone = ref('')
const deliveryArea = ref('')
const orderNotes = ref('')
const drawer = ref<HTMLElement | null>(null)
const drawerCloseButton = ref<HTMLButtonElement | null>(null)
const catalogueExpanded = ref(false)
const gridColumns = ref(1)

const updateGridColumns = () => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    gridColumns.value = 3
  } else if (window.matchMedia('(min-width: 640px)').matches) {
    gridColumns.value = 2
  } else {
    gridColumns.value = 1
  }
}

const filteredProducts = computed(() => {
  const normalizedQuery = searchQuery.value.trim().toLowerCase()
  const categoryProducts = selectedCategory.value === 'All'
    ? props.products
    : props.products.filter((product) => product.category === selectedCategory.value)

  if (!normalizedQuery) {
    return categoryProducts
  }

  return categoryProducts.filter((product) => {
    return [
      product.name,
      product.detail,
      product.category,
      product.description,
      ...product.tags,
    ].some((value) => value?.toLowerCase().includes(normalizedQuery))
  })
})

const cartQuantity = (productId: string) => {
  return props.cartLines.find((line) => line.product.id === productId)?.quantity ?? 0
}

const collapsedRowCount = computed(() => gridColumns.value === 1 ? 3 : 5)

const collapsedProductLimit = computed(() => collapsedRowCount.value * gridColumns.value)

const visibleProducts = computed(() => {
  if (catalogueExpanded.value || filteredProducts.value.length <= collapsedProductLimit.value) {
    return filteredProducts.value
  }

  return filteredProducts.value.slice(0, collapsedProductLimit.value)
})

const hiddenProductCount = computed(() => Math.max(filteredProducts.value.length - visibleProducts.value.length, 0))

const catalogueToggleLabel = computed(() => catalogueExpanded.value ? 'Show less' : `Show ${hiddenProductCount.value} more`)

const formatCurrency = (value: number) => `R${value.toFixed(2)}`

const checkoutReady = computed(() => {
  return Boolean(
    props.cartLines.length &&
      customerName.value.trim() &&
      customerPhone.value.trim() &&
      deliveryArea.value.trim(),
  )
})

const checkoutUrl = computed(() => {
  const lines = props.cartLines.map((line, index) => {
    const lineTotal = formatCurrency(line.product.priceValue * line.quantity)
    return `${index + 1}. ${line.product.name} (${line.product.detail}) x ${line.quantity} - ${lineTotal}`
  })

  const message = [
    'Hi NaijaLife, I would like to place this order for delivery/payment on delivery:',
    '',
    ...lines,
    '',
    `Total: ${formatCurrency(props.cartTotal)}`,
    '',
    `Name: ${customerName.value.trim()}`,
    `Phone: ${customerPhone.value.trim()}`,
    `Delivery area: ${deliveryArea.value.trim()}`,
    orderNotes.value.trim() ? `Notes: ${orderNotes.value.trim()}` : '',
    '',
    'Please confirm availability and delivery details.',
  ].filter(Boolean).join('\n')

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
})

const resetFilters = () => {
  selectedCategory.value = 'All'
  searchQuery.value = ''
  catalogueExpanded.value = false
}

const closeCart = () => {
  emit('set-cart-open', false)
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const handleCartKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeCart()
    return
  }

  if (event.key !== 'Tab' || !drawer.value) {
    return
  }

  const focusableElements = Array.from(drawer.value.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => element.offsetParent !== null)

  if (!focusableElements.length) {
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

watch(
  () => props.cartOpen,
  async (isOpen) => {
    if (!isOpen) {
      return
    }

    await nextTick()
    drawerCloseButton.value?.focus()
  },
)

watch([selectedCategory, searchQuery], () => {
  catalogueExpanded.value = false
})

onMounted(() => {
  updateGridColumns()
  window.addEventListener('resize', updateGridColumns)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateGridColumns)
})
</script>

<template>
  <section id="shop" class="bg-cream-50 py-12 sm:py-20">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-8">
      <div class="flex flex-col gap-5 border-y border-forest-950/10 py-6 md:flex-row md:items-end md:justify-between md:py-8">
        <div>
          <p class="text-[12px] font-bold uppercase tracking-[0.18em] text-olive-700">Shop catalogue</p>
          <h2 class="mt-3 font-serif text-[44px] font-bold leading-none text-forest-950 sm:text-[54px]">
            Build your NaijaLife basket.
          </h2>
          <p class="mt-4 max-w-[560px] text-[15px] font-medium leading-7 text-forest-950/70">
            Add your favourites, review your basket, then send the order straight to WhatsApp. Payment is handled on delivery.
          </p>
        </div>

        <button
          type="button"
          class="inline-flex h-12 items-center justify-center gap-3 rounded bg-forest-950 px-6 text-[13px] font-bold text-cream-50 transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-4 focus:ring-offset-cream-50"
          aria-label="Open shopping cart"
          @click="emit('set-cart-open', true)"
        >
          <ShoppingBag :size="19" />
          Cart
          <span class="rounded-full bg-gold-300 px-2 py-0.5 text-[11px] text-forest-950">{{ cartCount }}</span>
        </button>
      </div>

      <div class="sticky top-0 z-30 -mx-6 mt-6 border-b border-forest-950/10 bg-cream-50/95 px-6 py-4 backdrop-blur lg:static lg:mx-0 lg:mt-8 lg:grid lg:grid-cols-[1fr_320px] lg:items-center lg:border-b-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-0">
        <div class="flex gap-3 overflow-x-auto pb-2">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="h-10 shrink-0 rounded-full border px-5 text-[13px] font-bold transition focus:outline-none focus:ring-2 focus:ring-olive-600"
            :class="selectedCategory === category ? 'border-forest-950 bg-forest-950 text-cream-50' : 'border-forest-950/15 bg-white text-forest-950 hover:border-olive-600'"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <label class="relative mt-3 block lg:mt-0">
          <span class="sr-only">Search products</span>
          <Search class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-forest-950/45" :size="18" />
          <input
            v-model="searchQuery"
            type="search"
            class="h-11 w-full rounded border border-forest-950/15 bg-white pl-11 pr-4 text-[14px] font-medium text-forest-950 outline-none transition placeholder:text-forest-950/40 focus:border-olive-600 focus:ring-2 focus:ring-olive-600/25"
            placeholder="Search zobo, tea, bundles..."
          />
        </label>
      </div>

      <div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-[13px] font-bold text-forest-950/60">
        <p>{{ visibleProducts.length }} of {{ filteredProducts.length }} products shown</p>
        <button
          v-if="searchQuery || selectedCategory !== 'All'"
          type="button"
          class="text-olive-700 transition hover:text-forest-950 focus:outline-none focus:ring-2 focus:ring-olive-600"
          @click="resetFilters"
        >
          Reset filters
        </button>
      </div>

      <div v-if="filteredProducts.length" class="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <article
          v-for="product in visibleProducts"
          :key="product.id"
          class="group flex min-h-full flex-col rounded-lg border border-forest-950/10 bg-white p-4 shadow-[0_12px_34px_rgba(16,38,21,0.08)]"
        >
          <div class="relative h-[150px] overflow-hidden rounded-md sm:h-[210px] lg:h-[230px]">
            <ProductVisual :visual="product.visual" />
            <span class="absolute left-3 top-3 rounded-full bg-cream-50/95 px-3 py-1 text-[11px] font-bold text-forest-950 shadow-sm">
              {{ product.tags[0] }}
            </span>
          </div>

          <div class="flex flex-1 flex-col pt-4 sm:pt-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[12px] font-bold uppercase tracking-[0.14em] text-olive-700">{{ product.category }}</p>
                <h3 class="mt-2 text-[17px] font-bold leading-tight text-forest-950 sm:text-[19px]">{{ product.name }}</h3>
                <p class="mt-1 text-[13px] font-bold text-forest-950/55">{{ product.detail }}</p>
              </div>
            </div>

            <p class="product-description mt-3 flex-1 text-[13px] font-medium leading-5 text-forest-950/68 sm:mt-4 sm:text-[14px] sm:leading-6">{{ product.description }}</p>

            <div class="mt-4 flex flex-wrap gap-2 sm:mt-5">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="rounded-full bg-olive-300/45 px-3 py-1 text-[11px] font-bold text-forest-950"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-5 border-t border-forest-950/10 pt-4 sm:mt-6">
              <div class="mb-3 flex items-center justify-between">
                <span class="text-[12px] font-bold uppercase tracking-[0.14em] text-forest-950/45">Price</span>
                <p class="font-serif text-[25px] font-bold leading-none text-forest-950">{{ product.price }}</p>
              </div>
              <button
                v-if="cartQuantity(product.id) === 0"
                type="button"
                class="inline-flex h-11 w-full items-center justify-center gap-2 rounded bg-forest-950 text-[13px] font-bold text-cream-50 transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-300"
                :aria-label="`Add ${product.name} to cart`"
                @click="emit('add-to-cart', product)"
              >
                <Plus :size="18" />
                Add to cart
              </button>

              <div v-else class="grid h-11 grid-cols-[44px_1fr_44px] overflow-hidden rounded border border-forest-950/20">
                <button
                  type="button"
                  class="grid place-items-center bg-cream-100 text-forest-950 transition hover:bg-tan-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-olive-600"
                  :aria-label="`Remove one ${product.name}`"
                  @click="emit('remove-from-cart', product.id)"
                >
                  <Minus :size="17" />
                </button>
                <div class="grid place-items-center text-[13px] font-bold text-forest-950">
                  {{ cartQuantity(product.id) }} in cart
                </div>
                <button
                  type="button"
                  class="grid place-items-center bg-cream-100 text-forest-950 transition hover:bg-tan-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-olive-600"
                  :aria-label="`Add one more ${product.name}`"
                  @click="emit('add-to-cart', product)"
                >
                  <Plus :size="17" />
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredProducts.length > collapsedProductLimit" class="mt-8 flex justify-center">
        <button
          type="button"
          class="inline-flex h-12 items-center justify-center gap-2 rounded border border-forest-950/15 bg-white px-6 text-[13px] font-bold text-forest-950 shadow-sm transition hover:border-olive-600 hover:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-600"
          :aria-expanded="catalogueExpanded"
          @click="catalogueExpanded = !catalogueExpanded"
        >
          {{ catalogueToggleLabel }}
          <ChevronDown
            :size="18"
            class="transition-transform duration-300"
            :class="catalogueExpanded ? 'rotate-180' : 'animate-bounce-subtle'"
          />
        </button>
      </div>

      <div v-if="!filteredProducts.length" class="mt-8 rounded-lg border border-forest-950/10 bg-white px-6 py-14 text-center">
        <h3 class="font-serif text-[34px] font-bold leading-none text-forest-950">No products found.</h3>
        <p class="mx-auto mt-3 max-w-[420px] text-[14px] font-medium leading-6 text-forest-950/65">
          Try a different search term or clear your filters to see the full catalogue.
        </p>
        <button
          type="button"
          class="mt-6 h-11 rounded bg-forest-950 px-6 text-[13px] font-bold text-cream-50 transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-300"
          @click="resetFilters"
        >
          Show all products
        </button>
      </div>
    </div>
  </section>

  <div
    v-if="cartOpen"
    class="fixed inset-0 z-[60] bg-forest-950/45 backdrop-blur-sm"
    aria-hidden="true"
    @click="closeCart"
  ></div>

  <aside
    ref="drawer"
    class="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-[430px] flex-col bg-cream-50 shadow-[-24px_0_60px_rgba(16,38,21,0.22)] transition-transform duration-300"
    :class="cartOpen ? 'translate-x-0' : 'translate-x-full'"
    aria-label="Shopping cart"
    :aria-hidden="!cartOpen"
    :inert="!cartOpen"
    @keydown="handleCartKeydown"
  >
    <div class="flex items-center justify-between border-b border-forest-950/10 px-6 py-5">
      <div>
        <p class="text-[12px] font-bold uppercase tracking-[0.16em] text-olive-700">Your basket</p>
        <h2 class="mt-1 font-serif text-[34px] font-bold leading-none text-forest-950">{{ cartCount }} items</h2>
      </div>
      <div class="flex items-center gap-2">
        <button
          v-if="cartLines.length"
          type="button"
          class="h-10 rounded border border-forest-950/15 px-3 text-[12px] font-bold text-forest-950/70 transition hover:bg-cream-200 hover:text-forest-950 focus:outline-none focus:ring-2 focus:ring-olive-600"
          @click="emit('clear-cart')"
        >
          Clear all
        </button>
        <button
          ref="drawerCloseButton"
          type="button"
          class="grid h-10 w-10 place-items-center rounded-full border border-forest-950/15 text-forest-950 transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600"
          aria-label="Close shopping cart"
          @click="closeCart"
        >
          <X :size="20" />
        </button>
      </div>
    </div>

    <div v-if="cartLines.length" class="flex-1 overflow-y-auto px-6 py-4">
      <div
        v-for="line in cartLines"
        :key="line.product.id"
        class="grid grid-cols-[76px_1fr] gap-4 border-b border-forest-950/10 py-4"
      >
        <div class="h-[76px] overflow-hidden rounded-md">
          <ProductVisual :visual="line.product.visual" />
        </div>
        <div>
          <div class="flex items-start justify-between gap-3">
            <div>
              <h3 class="text-[14px] font-bold leading-tight text-forest-950">{{ line.product.name }}</h3>
              <p class="mt-1 text-[12px] font-bold text-forest-950/55">{{ line.product.detail }}</p>
            </div>
            <p class="text-[14px] font-bold text-forest-950">{{ formatCurrency(line.product.priceValue * line.quantity) }}</p>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center overflow-hidden rounded border border-forest-950/15">
              <button type="button" class="grid h-8 w-8 place-items-center hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-olive-600" :aria-label="`Remove one ${line.product.name}`" @click="emit('remove-from-cart', line.product.id)">
                <Minus :size="15" />
              </button>
              <span class="grid h-8 min-w-10 place-items-center text-[12px] font-bold">{{ line.quantity }}</span>
              <button type="button" class="grid h-8 w-8 place-items-center hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-olive-600" :aria-label="`Add one more ${line.product.name}`" @click="emit('add-to-cart', line.product)">
                <Plus :size="15" />
              </button>
            </div>
            <button
              type="button"
              class="inline-flex items-center gap-1 text-[12px] font-bold text-forest-950/60 transition hover:text-forest-950 focus:outline-none focus:ring-2 focus:ring-olive-600"
              :aria-label="`Remove ${line.product.name} from cart`"
              @click="emit('clear-from-cart', line.product.id)"
            >
              <Trash2 :size="15" />
              Remove
            </button>
          </div>
        </div>
      </div>

      <div class="mt-5 rounded-md border border-forest-950/10 bg-white p-4">
        <h3 class="text-[14px] font-bold text-forest-950">Delivery details</h3>
        <p class="mt-1 text-[12px] font-medium leading-5 text-forest-950/55">Required fields are marked. These details are included in your WhatsApp order.</p>

        <div class="mt-4 grid gap-3">
          <label class="block">
            <span class="text-[12px] font-bold text-forest-950">Name <span class="text-olive-700">*</span></span>
            <input
              v-model="customerName"
              class="mt-1 h-10 w-full rounded border border-forest-950/15 bg-cream-50 px-3 text-[13px] font-medium outline-none transition focus:border-olive-600 focus:ring-2 focus:ring-olive-600/25"
              autocomplete="name"
              required
              placeholder="Your name"
            />
          </label>
          <label class="block">
            <span class="text-[12px] font-bold text-forest-950">Phone <span class="text-olive-700">*</span></span>
            <input
              v-model="customerPhone"
              class="mt-1 h-10 w-full rounded border border-forest-950/15 bg-cream-50 px-3 text-[13px] font-medium outline-none transition focus:border-olive-600 focus:ring-2 focus:ring-olive-600/25"
              autocomplete="tel"
              inputmode="tel"
              required
              placeholder="Your phone number"
            />
          </label>
          <label class="block">
            <span class="text-[12px] font-bold text-forest-950">Delivery area <span class="text-olive-700">*</span></span>
            <input
              v-model="deliveryArea"
              class="mt-1 h-10 w-full rounded border border-forest-950/15 bg-cream-50 px-3 text-[13px] font-medium outline-none transition focus:border-olive-600 focus:ring-2 focus:ring-olive-600/25"
              autocomplete="address-level2"
              required
              placeholder="Cape Town, Woodstock..."
            />
          </label>
          <label class="block">
            <span class="text-[12px] font-bold text-forest-950">Notes</span>
            <textarea
              v-model="orderNotes"
              class="mt-1 min-h-20 w-full resize-none rounded border border-forest-950/15 bg-cream-50 px-3 py-2 text-[13px] font-medium leading-5 outline-none transition focus:border-olive-600 focus:ring-2 focus:ring-olive-600/25"
              placeholder="Delivery time, substitutions, gift note..."
            ></textarea>
          </label>
        </div>
        <p v-if="!checkoutReady" class="mt-3 rounded bg-cream-100 px-3 py-2 text-[12px] font-bold leading-5 text-forest-950/65">
          Add name, phone and delivery area to enable WhatsApp checkout.
        </p>
      </div>
    </div>

    <div v-else class="grid flex-1 place-items-center px-8 text-center">
      <div>
        <ShoppingBag class="mx-auto text-olive-700" :size="44" stroke-width="1.5" />
        <h3 class="mt-5 font-serif text-[32px] font-bold text-forest-950">Your basket is empty.</h3>
        <p class="mt-3 text-[14px] font-medium leading-6 text-forest-950/65">Add a few essentials and checkout through WhatsApp when you are ready.</p>
        <button
          type="button"
          class="mt-6 h-11 rounded bg-forest-950 px-6 text-[13px] font-bold text-cream-50 transition hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-300"
          @click="closeCart"
        >
          Continue shopping
        </button>
      </div>
    </div>

    <div class="border-t border-forest-950/10 bg-white px-6 py-5">
      <div class="flex items-center justify-between text-forest-950">
        <span class="text-[14px] font-bold">Order total</span>
        <span class="font-serif text-[30px] font-bold">{{ formatCurrency(cartTotal) }}</span>
      </div>
      <a
        class="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 rounded text-[13px] font-bold transition focus:outline-none focus:ring-2 focus:ring-gold-300"
        :class="checkoutReady ? 'bg-forest-950 text-cream-50 hover:bg-forest-800' : 'pointer-events-none bg-forest-950/25 text-forest-950/45'"
        :href="checkoutReady ? checkoutUrl : undefined"
        target="_blank"
        rel="noreferrer"
        aria-label="Checkout on WhatsApp"
      >
        <MessageCircle :size="19" />
        Checkout on WhatsApp
      </a>
      <button
        v-if="cartLines.length"
        type="button"
        class="mt-3 h-11 w-full rounded border border-forest-950/15 text-[13px] font-bold text-forest-950 transition hover:bg-cream-100 focus:outline-none focus:ring-2 focus:ring-olive-600"
        @click="closeCart"
      >
        Continue shopping
      </button>
      <p class="mt-3 text-center text-[12px] font-medium text-forest-950/55">
        {{ cartLines.length ? 'Payment is collected on delivery. Name, phone and delivery area are required.' : 'Add items to enable checkout.' }}
      </p>
    </div>
  </aside>
</template>
