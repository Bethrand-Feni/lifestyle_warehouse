<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import CategoryGrid from './components/CategoryGrid.vue'
import StoryBanner from './components/StoryBanner.vue'
import ShopCatalogue from './components/ShopCatalogue.vue'
import ProductCarousel from './components/ProductCarousel.vue'
import PromoPanel from './components/PromoPanel.vue'
import BundleCarousel from './components/BundleCarousel.vue'
import Footer from './components/Footer.vue'
import productsData from './data/products.json'
import type { CatalogueProduct, Product } from './types'

const products = productsData as CatalogueProduct[]
const cart = reactive<Record<string, number>>({})
const cartOpen = ref(false)

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
</script>

<template>
  <div class="min-h-screen bg-cream-50 font-sans text-forest-950">
    <Navbar :cart-count="cartCount" @open-cart="cartOpen = true" />
    <main>
      <HeroSection />
      <CategoryGrid />
      <StoryBanner />
      <ShopCatalogue
        :products="products"
        :cart-lines="cartLines"
        :cart-count="cartCount"
        :cart-total="cartTotal"
        :cart-open="cartOpen"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @clear-from-cart="clearFromCart"
        @set-cart-open="cartOpen = $event"
      />
      <ProductCarousel />
      <PromoPanel />
      <BundleCarousel @add-to-cart="addToCart" />
    </main>
    <Footer />
  </div>
</template>
