<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductVisual from './ProductVisual.vue'
import type { Product } from '../types'

defineEmits<{
  'add-to-cart': [product: Product]
}>()

const rail = ref<HTMLElement | null>(null)

const bundles: Product[] = [
  { id: 'after-owambo-recovery-pack', name: 'After Owambo Recovery Pack', price: 'R239.00', visual: 'bundle-a' },
  { id: 'wind-down-recovery-pack', name: 'Wind-Down & Recovery Pack', price: 'R299.00', visual: 'bundle-b' },
  { id: 'nigerian-pantry-starter-pack', name: 'Nigerian Pantry Starter Pack', price: 'R349.00', visual: 'bundle-c' },
  { id: 'gym-bag-pack', name: 'Gym Bag Pack', price: 'R279.00', visual: 'bundle-d' },
  { id: 'workday-energy-pack', name: 'Workday Energy Pack', price: 'R249.00', visual: 'bundle-e' },
]

const scroll = (direction: number) => {
  rail.value?.scrollBy({ left: direction * 286, behavior: 'smooth' })
}
</script>

<template>
  <section id="bundles" class="bg-cream-50 pb-20">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-8">
      <h2 class="leaf-ornament relative text-center font-serif text-[42px] font-bold leading-none text-forest-950">
        Bundles for every moment
      </h2>

      <div class="relative mt-10">
        <button class="absolute -left-4 top-[36%] z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-forest-950 shadow transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600" aria-label="Scroll bundles left" @click="scroll(-1)">
          <ChevronLeft :size="25" />
        </button>
        <div ref="rail" class="scrollbar-none flex snap-x gap-8 overflow-x-auto scroll-smooth px-2 pb-2">
          <article v-for="bundle in bundles" :key="bundle.id" class="min-w-[214px] snap-start text-center sm:min-w-[232px]">
            <div class="h-[214px] overflow-hidden rounded-md">
              <ProductVisual :visual="bundle.visual" />
            </div>
            <h3 class="mx-auto mt-5 min-h-12 max-w-[188px] text-[15px] font-bold leading-tight text-forest-950">{{ bundle.name }}</h3>
            <p class="mt-4 text-[14px] font-bold text-forest-950">{{ bundle.price }}</p>
            <button class="mt-5 h-9 rounded border border-forest-950 px-7 text-[12px] font-bold text-forest-950 transition hover:bg-forest-950 hover:text-cream-50 focus:outline-none focus:ring-2 focus:ring-olive-600" @click="$emit('add-to-cart', bundle)" :aria-label="`Add ${bundle.name} to cart`">
              Add to cart
            </button>
          </article>
        </div>
        <button class="absolute -right-4 top-[36%] z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-forest-950 shadow transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600" aria-label="Scroll bundles right" @click="scroll(1)">
          <ChevronRight :size="25" />
        </button>
      </div>
    </div>
  </section>
</template>
