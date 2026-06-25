<script setup lang="ts">
import { Leaf, CupSoda, MoonStar, ShoppingBag } from 'lucide-vue-next'

const categories = [
  { title: 'Snacks & Pantry', desc: 'Everyday Nigerian favourites.', icon: Leaf },
  { title: 'Drinks & Mixes', desc: 'Traditional drinks & functional blends.', icon: CupSoda },
  { title: 'Sleep & Recovery', desc: 'Better nights. Better you.', icon: MoonStar },
  { title: 'Bundles', desc: 'Curated packs for every moment.', icon: ShoppingBag },
]
</script>

<template>
  <section id="shop" class="bg-cream-50 py-14 sm:py-16">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-8">
      <h2 class="leaf-ornament relative text-center font-serif text-[42px] font-bold leading-none text-forest-950">
        Shop by category
      </h2>

      <div class="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
        <article
          v-for="(category, index) in categories"
          :key="category.title"
          class="flex flex-col items-center px-4 text-center md:min-h-[168px] md:px-9"
          :class="index > 0 ? 'md:border-l md:border-forest-950/12' : ''"
        >
          <component :is="category.icon" class="mb-4 text-olive-700" :size="58" stroke-width="1.45" />
          <h3 class="font-serif text-[25px] font-bold leading-tight text-forest-950">{{ category.title }}</h3>
          <p class="mt-3 min-h-10 text-[13px] font-medium leading-[1.35] text-forest-950/75">{{ category.desc }}</p>
          <a href="#best-sellers" class="mt-4 text-[13px] font-bold text-forest-950 transition hover:text-olive-600">
            Shop now →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
