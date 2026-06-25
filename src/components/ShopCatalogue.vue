<script setup lang="ts">
import { computed } from 'vue'
import { Minus, Plus, ShoppingBag, Trash2, MessageCircle, X } from 'lucide-vue-next'
import ProductVisual from './ProductVisual.vue'
import type { CatalogueProduct, CartLine } from '../types'

const WHATSAPP_PHONE = '27820000000'

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
  'set-cart-open': [open: boolean]
}>()

const categories = computed(() => ['All', ...new Set(props.products.map((product) => product.category))])
const selectedCategory = defineModel<string>('category', { default: 'All' })

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'All') {
    return props.products
  }

  return props.products.filter((product) => product.category === selectedCategory.value)
})

const cartQuantity = (productId: string) => {
  return props.cartLines.find((line) => line.product.id === productId)?.quantity ?? 0
}

const formatCurrency = (value: number) => `R${value.toFixed(2)}`

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
    'Please confirm availability and delivery details.',
  ].join('\n')

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <section id="shop" class="bg-cream-50 py-16 sm:py-20">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-8">
      <div class="flex flex-col gap-5 border-y border-forest-950/10 py-8 md:flex-row md:items-end md:justify-between">
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

      <div class="mt-8 flex gap-3 overflow-x-auto pb-2">
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

      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="group flex min-h-full flex-col rounded-lg border border-forest-950/10 bg-white p-4 shadow-[0_12px_34px_rgba(16,38,21,0.08)]"
        >
          <div class="h-[230px] overflow-hidden rounded-md">
            <ProductVisual :visual="product.visual" />
          </div>

          <div class="flex flex-1 flex-col pt-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[12px] font-bold uppercase tracking-[0.14em] text-olive-700">{{ product.category }}</p>
                <h3 class="mt-2 text-[19px] font-bold leading-tight text-forest-950">{{ product.name }}</h3>
                <p class="mt-1 text-[13px] font-bold text-forest-950/55">{{ product.detail }}</p>
              </div>
              <p class="shrink-0 text-[17px] font-bold text-forest-950">{{ product.price }}</p>
            </div>

            <p class="mt-4 flex-1 text-[14px] font-medium leading-6 text-forest-950/68">{{ product.description }}</p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="rounded-full bg-olive-300/45 px-3 py-1 text-[11px] font-bold text-forest-950"
              >
                {{ tag }}
              </span>
            </div>

            <div class="mt-6">
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
    </div>
  </section>

  <div
    v-if="cartOpen"
    class="fixed inset-0 z-[60] bg-forest-950/45 backdrop-blur-sm"
    aria-hidden="true"
    @click="emit('set-cart-open', false)"
  ></div>

  <aside
    class="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-[430px] flex-col bg-cream-50 shadow-[-24px_0_60px_rgba(16,38,21,0.22)] transition-transform duration-300"
    :class="cartOpen ? 'translate-x-0' : 'translate-x-full'"
    aria-label="Shopping cart"
    :aria-hidden="!cartOpen"
  >
    <div class="flex items-center justify-between border-b border-forest-950/10 px-6 py-5">
      <div>
        <p class="text-[12px] font-bold uppercase tracking-[0.16em] text-olive-700">Your basket</p>
        <h2 class="mt-1 font-serif text-[34px] font-bold leading-none text-forest-950">{{ cartCount }} items</h2>
      </div>
      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-full border border-forest-950/15 text-forest-950 transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600"
        aria-label="Close shopping cart"
        @click="emit('set-cart-open', false)"
      >
        <X :size="20" />
      </button>
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
    </div>

    <div v-else class="grid flex-1 place-items-center px-8 text-center">
      <div>
        <ShoppingBag class="mx-auto text-olive-700" :size="44" stroke-width="1.5" />
        <h3 class="mt-5 font-serif text-[32px] font-bold text-forest-950">Your basket is empty.</h3>
        <p class="mt-3 text-[14px] font-medium leading-6 text-forest-950/65">Add a few essentials and checkout through WhatsApp when you are ready.</p>
      </div>
    </div>

    <div class="border-t border-forest-950/10 bg-white px-6 py-5">
      <div class="flex items-center justify-between text-forest-950">
        <span class="text-[14px] font-bold">Order total</span>
        <span class="font-serif text-[30px] font-bold">{{ formatCurrency(cartTotal) }}</span>
      </div>
      <a
        class="mt-4 inline-flex h-12 w-full items-center justify-center gap-3 rounded text-[13px] font-bold transition focus:outline-none focus:ring-2 focus:ring-gold-300"
        :class="cartLines.length ? 'bg-forest-950 text-cream-50 hover:bg-forest-800' : 'pointer-events-none bg-forest-950/25 text-forest-950/45'"
        :href="cartLines.length ? checkoutUrl : undefined"
        target="_blank"
        rel="noreferrer"
        aria-label="Checkout on WhatsApp"
      >
        <MessageCircle :size="19" />
        Checkout on WhatsApp
      </a>
      <p class="mt-3 text-center text-[12px] font-medium text-forest-950/55">Payment is collected on delivery.</p>
    </div>
  </aside>
</template>
