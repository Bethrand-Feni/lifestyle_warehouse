<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const storyOpen = ref(false)
const storyDialog = ref<HTMLElement | null>(null)
const storyCloseButton = ref<HTMLButtonElement | null>(null)
const storyTrigger = ref<HTMLButtonElement | null>(null)

const closeStory = () => {
  storyOpen.value = false
  nextTick(() => {
    storyTrigger.value?.focus()
  })
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeStory()
    return
  }

  if (event.key !== 'Tab' || !storyDialog.value) {
    return
  }

  const focusableElements = Array.from(storyDialog.value.querySelectorAll<HTMLElement>(focusableSelector))
    .filter((element) => element.offsetParent !== null)

  if (!focusableElements.length) {
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
}

watch(storyOpen, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''

  if (isOpen) {
    window.addEventListener('keydown', handleKeydown)
    await nextTick()
    storyCloseButton.value?.focus()
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <section id="story" class="story-gradient relative overflow-hidden py-16 text-cream-50 sm:py-20">
    <div class="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[0.48fr_0.52fr] lg:px-8">
      <div class="relative z-10 max-w-[420px]">
        <h2 class="font-serif text-[43px] font-bold leading-[0.96] text-cream-100 sm:text-[49px]">
          Rooted in culture. Chosen for real life.
        </h2>
        <p class="mt-7 text-[17px] font-medium leading-[1.48] text-cream-100/95">
          We bring you high-quality Nigerian essentials that fit your routine, support your wellness and connect you to home.
        </p>
        <button
          ref="storyTrigger"
          type="button"
          class="mt-8 inline-flex h-12 items-center rounded bg-cream-200 px-8 text-[13px] font-bold text-forest-950 transition hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:ring-offset-4 focus:ring-offset-forest-950"
          @click="storyOpen = true"
        >
          Learn Our Story
        </button>
      </div>

      <div class="hidden min-h-[330px] md:block lg:min-h-[360px]" aria-hidden="true"></div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="storyOpen"
      class="fixed inset-0 z-[80] bg-forest-950/55 backdrop-blur-sm"
      aria-hidden="true"
      @click="closeStory"
    ></div>

    <section
      v-if="storyOpen"
      ref="storyDialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
      class="fixed left-1/2 top-1/2 z-[90] max-h-[calc(100vh-2rem)] w-[min(92vw,620px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-cream-50 p-6 text-forest-950 shadow-[0_30px_80px_rgba(16,38,21,0.35)] sm:p-8"
      @keydown="handleKeydown"
    >
      <div class="flex items-start justify-between gap-5">
        <div>
          <p class="text-[12px] font-bold uppercase tracking-[0.18em] text-olive-700">Our story</p>
          <h2 id="story-modal-title" class="mt-3 font-serif text-[40px] font-bold leading-none text-forest-950 sm:text-[48px]">
            Made for the everyday table.
          </h2>
        </div>
        <button
          ref="storyCloseButton"
          type="button"
          class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest-950/15 text-forest-950 transition hover:bg-cream-200 focus:outline-none focus:ring-2 focus:ring-olive-600"
          aria-label="Close story"
          @click="closeStory"
        >
          <X :size="20" />
        </button>
      </div>

      <div class="mt-6 space-y-4 text-[15px] font-medium leading-7 text-forest-950/72">
        <p>
          NaijaLife started as a small pantry idea for Nigerians who wanted familiar flavours without waiting for a suitcase from home. We bring together drinks, snacks, teas and practical bundles that feel rooted in culture but easy enough for weekday life.
        </p>
        <p>
          Our products are chosen for real routines: a chilled glass of zobo after work, suya peanuts for the desk drawer, ginger concentrate for slow mornings, and wind-down teas for nights that need a softer landing.
        </p>
        <p>
          We are based around Cape Town and built for simple ordering. Add what you need, send the basket on WhatsApp, and pay when your order arrives.
        </p>
      </div>

    </section>
  </Teleport>
</template>
