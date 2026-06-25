<script setup lang="ts">
import { BadgeCheck, HeartHandshake, Truck } from 'lucide-vue-next'
</script>

<template>
  <section id="top" class="hero relative overflow-hidden text-cream-50">
    <div class="mx-auto grid min-h-[600px] max-w-[1180px] grid-cols-1 items-center gap-8 px-6 pb-10 pt-14 md:grid-cols-[0.88fr_1.12fr] lg:min-h-[640px] lg:px-8 lg:pt-12">
      <div class="relative z-10 max-w-[510px]">
        <h1 class="font-serif text-[52px] font-bold leading-[0.9] tracking-normal text-cream-100 sm:text-[62px] lg:text-[79px]">
          Nigerian essentials for better everyday living.
        </h1>
        <p class="mt-8 max-w-[370px] text-[17px] font-medium leading-[1.55] text-cream-100/95">
          From pantry staples to recovery and sleep support - practical products rooted in home, made for life wherever you are.
        </p>
        <div class="mt-9 flex flex-wrap items-center gap-6">
          <a href="#shop" class="inline-flex h-12 items-center rounded bg-cream-200 px-8 text-[13px] font-bold text-forest-950 transition hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-4 focus:ring-offset-forest-950">
            Shop Now
          </a>
          <a href="#shop" class="text-[13px] font-bold text-cream-100 transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300">
            Explore Bundles →
          </a>
        </div>

        <div class="mt-12 grid max-w-[560px] grid-cols-1 gap-4 text-[12px] font-bold text-cream-100 sm:grid-cols-3 lg:mt-16">
          <div class="flex items-center gap-3">
            <BadgeCheck class="text-cream-100" :size="22" stroke-width="1.7" />
            Nigerian-inspired
          </div>
          <div class="flex items-center gap-3">
            <HeartHandshake class="text-cream-100" :size="22" stroke-width="1.7" />
            Quality you can trust
          </div>
          <div class="flex items-center gap-3">
            <Truck class="text-cream-100" :size="22" stroke-width="1.7" />
            Fast delivery in Cape Town
          </div>
        </div>
      </div>


    </div>
  </section>
</template>
