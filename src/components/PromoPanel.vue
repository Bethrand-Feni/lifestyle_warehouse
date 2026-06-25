<script setup lang="ts">
import { Gift, Truck } from 'lucide-vue-next'
</script>

<template>
  <section id="delivery" class="bg-cream-50 px-6 pb-16 lg:px-8">
    <div class="mx-auto grid max-w-[1080px] overflow-hidden rounded-[18px] shadow-soft md:grid-cols-2">
      <div class="bg-forest-900 px-8 py-12 text-center text-cream-100 sm:px-12">
        <Truck class="mx-auto mb-5" :size="52" stroke-width="1.45" />
        <h2 class="font-serif text-[34px] font-bold leading-none">Fast & reliable delivery</h2>
        <p class="mx-auto mt-4 max-w-[330px] text-[15px] font-medium leading-[1.35] text-cream-100/80">
          Cape Town delivery in 24-48hrs. Nationwide shipping available.
        </p>
        <a href="#footer" class="mt-6 inline-block text-[14px] font-bold hover:text-gold-300">Shipping Info →</a>
      </div>
      <div class="bg-olive-300 px-8 py-12 text-center text-forest-950 sm:px-12">
        <Gift class="mx-auto mb-5" :size="52" stroke-width="1.45" />
        <h2 class="font-serif text-[34px] font-bold leading-none">Perfect for gifting</h2>
        <p class="mx-auto mt-4 max-w-[330px] text-[15px] font-medium leading-[1.35] text-forest-950/75">
          Thoughtful bundles for birthdays, celebrations & corporate gifting.
        </p>
        <a href="#shop" class="mt-6 inline-block text-[14px] font-bold hover:text-forest-800">Explore Bundles →</a>
      </div>
    </div>
  </section>
</template>
