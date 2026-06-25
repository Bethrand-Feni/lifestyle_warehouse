<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductVisual from './ProductVisual.vue'
import type { Product } from '../types'

const rail = ref<HTMLElement | null>(null)

const products: Product[] = [
  { id: 'zobo-concentrate', name: 'Zobo Concentrate', detail: '500ml', price: 'R120.00', visual: 'zobo' },
  { id: 'suya-peanut-mix', name: 'Suya Peanut Mix', detail: '200g', price: 'R55.00', visual: 'suya' },
  { id: 'tigernut-date-energy-mix', name: 'Tigernut & Date Energy Mix', detail: '150g', price: 'R65.00', visual: 'tiger' },
  { id: 'ginger-lemon-honey-concentrate', name: 'Ginger, Lemon & Honey Concentrate', detail: '500ml', price: 'R99.00', visual: 'ginger' },
  { id: 'sleep-tea', name: 'Caffeine-Free Sleep Tea', detail: '20 Tea Bags', price: 'R85.00', visual: 'sleep' },
]

const scroll = (direction: number) => {
  rail.value?.scrollBy({ left: direction * 286, behavior: 'smooth' })
}
</script>

<template>
  <section id="best-sellers" class="bg-cream-50 py-16 sm:py-20">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-8">
      <div class="text-center">
        <h2 class="font-serif text-[42px] font-bold leading-none text-forest-950">Best sellers</h2>
        <p class="mt-3 text-[13px] font-medium text-forest-950/70">Customer favourites, always.</p>
      </div>

      <div class="relative mt-8">
        <button class="absolute -left-4 top-[38%] z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-forest-950 shadow transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600" aria-label="Scroll best sellers left" @click="scroll(-1)">
          <ChevronLeft :size="25" />
        </button>
        <div ref="rail" class="scrollbar-none flex snap-x gap-8 overflow-x-auto scroll-smooth px-2 pb-2">
          <article v-for="product in products" :key="product.id" class="min-w-[214px] snap-start text-center sm:min-w-[232px]">
            <div class="h-[214px] overflow-hidden rounded-md">
              <ProductVisual :visual="product.visual" />
            </div>
            <h3 class="mx-auto mt-5 min-h-11 max-w-[190px] text-[14px] font-bold leading-tight text-forest-950">{{ product.name }}</h3>
            <p class="mt-1 text-[12px] font-medium text-forest-950/55">{{ product.detail }}</p>
            <p class="mt-4 text-[14px] font-bold text-forest-950">{{ product.price }}</p>
          </article>
        </div>
        <button class="absolute -right-4 top-[38%] z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-forest-950 shadow transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600" aria-label="Scroll best sellers right" @click="scroll(1)">
          <ChevronRight :size="25" />
        </button>
      </div>
    </div>
  </section>
</template>
