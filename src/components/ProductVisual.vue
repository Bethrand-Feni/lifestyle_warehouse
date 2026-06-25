<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../types'
import { naijalifeAssets } from '../assets/naijalife'

const props = defineProps<{
  visual: Product['visual']
  compact?: boolean
}>()

const image = computed(() => {
  const images: Record<Product['visual'], string> = {
    zobo: naijalifeAssets.zoboConcentrate,
    suya: naijalifeAssets.suyaPeanutMix,
    tiger: naijalifeAssets.tigernutDateEnergyBowl,
    ginger: naijalifeAssets.gingerLemonHoneyDrink,
    sleep: naijalifeAssets.sleepTea,
    'bundle-a': naijalifeAssets.cleanseWellnessPack,
    'bundle-b': naijalifeAssets.midWeekRefreshPack,
    'bundle-c': naijalifeAssets.highImmuneStarterPack,
    'bundle-d': naijalifeAssets.sipBigPack,
    'bundle-e': naijalifeAssets.naijaDailyEssentialsPack,
  }

  return images[props.visual]
})
</script>

<template>
  <div class="relative mx-auto flex h-full w-full items-center justify-center overflow-hidden rounded-md product-card-image">
    <img
      :src="image"
      alt=""
      class="h-[92%] w-[92%] object-contain drop-shadow-[0_16px_20px_rgba(16,38,21,0.18)]"
      :class="visual === 'sleep' ? 'scale-[0.92]' : ''"
      loading="lazy"
    />
  </div>
</template>
