<script setup lang="ts">
import { Leaf, CupSoda, MoonStar, ShoppingBag } from 'lucide-vue-next'

defineEmits<{
  'select-category': [category: string]
}>()

const categories = [
  { title: 'Snacks & Pantry', desc: 'Everyday Nigerian favourites.', icon: Leaf },
  { title: 'Drinks & Mixes', desc: 'Traditional drinks & functional blends.', icon: CupSoda },
  { title: 'Sleep & Recovery', desc: 'Better nights. Better you.', icon: MoonStar },
  { title: 'Bundles', desc: 'Curated packs for every moment.', icon: ShoppingBag },
]
</script>

<template>
  <section id="categories" class="bg-cream-50 py-10 sm:py-16">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-8">
      <h2 class="leaf-ornament relative text-center font-serif text-[42px] font-bold leading-none text-forest-950">
        Shop by category
      </h2>

      <div class="mt-8 grid grid-cols-2 gap-4 sm:mt-12 md:grid-cols-4 md:gap-0">
        <article
          v-for="(category, index) in categories"
          :key="category.title"
          class="flex flex-col items-center rounded-md bg-white/45 px-3 py-5 text-center md:min-h-[168px] md:rounded-none md:bg-transparent md:px-9 md:py-0"
          :class="index > 0 ? 'md:border-l md:border-forest-950/12' : ''"
        >
          <component :is="category.icon" class="mb-3 text-olive-700 sm:mb-4" :size="46" stroke-width="1.45" />
          <h3 class="font-serif text-[21px] font-bold leading-tight text-forest-950 sm:text-[25px]">{{ category.title }}</h3>
          <p class="mt-2 min-h-9 text-[12px] font-medium leading-[1.35] text-forest-950/75 sm:mt-3 sm:text-[13px]">{{ category.desc }}</p>
          <a
            href="#shop"
            class="mt-3 text-[13px] font-bold text-forest-950 transition hover:text-olive-600 focus:outline-none focus:ring-2 focus:ring-olive-600 sm:mt-4"
            @click="$emit('select-category', category.title)"
          >
            Shop now →
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
