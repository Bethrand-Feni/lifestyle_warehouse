<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { ShoppingBag } from 'lucide-vue-next'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import CategoryGrid from './components/CategoryGrid.vue'
import StoryBanner from './components/StoryBanner.vue'
import ShopCatalogue from './components/ShopCatalogue.vue'
import PromoPanel from './components/PromoPanel.vue'
import Footer from './components/Footer.vue'
import productsData from './data/products.json'
import type { CatalogueProduct, Product } from './types'

const products = productsData as CatalogueProduct[]
const cart = reactive<Record<string, number>>({})
const cartOpen = ref(false)
const mobileCartVisible = ref(false)
const selectedCategory = ref('All')
const cartStorageKey = 'naijalife-cart'

const updateMobileCartVisibility = () => {
  mobileCartVisible.value = window.scrollY > 84
}

onMounted(() => {
  const storedCart = window.localStorage.getItem(cartStorageKey)

  if (!storedCart) {
    return
  }

  try {
    const parsed = JSON.parse(storedCart) as Record<string, number>
    Object.entries(parsed).forEach(([productId, quantity]) => {
      if (products.some((product) => product.id === productId) && quantity > 0) {
        cart[productId] = quantity
      }
    })
  } catch {
    window.localStorage.removeItem(cartStorageKey)
  }

  updateMobileCartVisibility()
  window.addEventListener('scroll', updateMobileCartVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateMobileCartVisibility)
})

watch(
  cart,
  () => {
    window.localStorage.setItem(cartStorageKey, JSON.stringify(cart))
  },
  { deep: true },
)

const cartLines = computed(() => {
  return products
    .filter((product) => cart[product.id] > 0)
    .map((product) => ({
      product,
      quantity: cart[product.id],
    }))
})

const cartCount = computed(() => {
  return Object.values(cart).reduce((total, quantity) => total + quantity, 0)
})

const cartTotal = computed(() => {
  return cartLines.value.reduce((total, line) => total + line.product.priceValue * line.quantity, 0)
})

const addToCart = (product?: CatalogueProduct | Product) => {
  if (!product) {
    cartOpen.value = true
    return
  }

  const catalogueProduct = products.find((item) => item.id === product.id)

  if (!catalogueProduct) {
    return
  }

  cart[catalogueProduct.id] = (cart[catalogueProduct.id] ?? 0) + 1
}

const removeFromCart = (productId: string) => {
  const quantity = cart[productId] ?? 0

  if (quantity <= 1) {
    delete cart[productId]
    return
  }

  cart[productId] = quantity - 1
}

const clearFromCart = (productId: string) => {
  delete cart[productId]
}

const clearCart = () => {
  Object.keys(cart).forEach((productId) => {
    delete cart[productId]
  })
}

const selectCategory = (category: string) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="min-h-screen bg-cream-50 font-sans text-forest-950">
    <Navbar :cart-count="cartCount" @open-cart="cartOpen = true" />
    <main>
      <HeroSection />
      <CategoryGrid @select-category="selectCategory" />
      <StoryBanner />
      <ShopCatalogue
        v-model:category="selectedCategory"
        :products="products"
        :cart-lines="cartLines"
        :cart-count="cartCount"
        :cart-total="cartTotal"
        :cart-open="cartOpen"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @clear-from-cart="clearFromCart"
        @clear-cart="clearCart"
        @set-cart-open="cartOpen = $event"
      />
      <PromoPanel />
    </main>
    <button
      type="button"
      class="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-forest-950 text-cream-50 shadow-[0_14px_34px_rgba(16,38,21,0.3)] transition-all duration-300 ease-out hover:bg-forest-800 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-4 focus:ring-offset-cream-50 md:hidden"
      :class="mobileCartVisible ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-5 scale-95 opacity-0'"
      aria-label="Open shopping bag"
      @click="cartOpen = true"
    >
      <ShoppingBag :size="23" stroke-width="1.9" />
      <span class="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-gold-300 px-1.5 text-[11px] font-bold leading-none text-forest-950">
        {{ cartCount }}
      </span>
    </button>
    <Footer />
  </div>
</template>
