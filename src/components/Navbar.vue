<script setup lang="ts">
import { ShoppingBag } from 'lucide-vue-next'

defineProps<{
  cartCount: number
}>()

defineEmits<{
  'open-cart': []
}>()

const links = [
  { label: 'Shop', href: '#shop' },
  { label: 'About Us', href: '#story' },
  { label: 'Contact', href: '#footer' },
]
</script>

<template>
  <header class="z-50 border-b border-cream-100/20 bg-forest-950 text-cream-50 backdrop-blur md:sticky md:top-0">
    <nav class="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-6 lg:px-8" aria-label="Primary navigation">
      <a href="#top" class="font-serif text-[34px] font-bold leading-none tracking-normal text-cream-100">
        NaijaLife
      </a>

      <div class="hidden items-center gap-12 text-[13px] font-bold md:flex">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="rounded-sm text-cream-100 transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-4 focus:ring-offset-forest-950"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-4 text-cream-100">
        <button class="relative rounded-full p-2 transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300" aria-label="Open shopping bag" @click="$emit('open-cart')">
          <ShoppingBag :size="22" stroke-width="1.9" />
          <span class="absolute -right-0.5 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-cream-100 px-1 text-[10px] font-bold leading-none text-forest-950">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </nav>
  </header>
</template>
