<script setup lang="ts">
import { ref } from 'vue'
import { Instagram, Music2, MessageCircle } from 'lucide-vue-next'

const email = ref('')
const error = ref('')
const success = ref(false)

const submit = () => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
  if (!isValid) {
    success.value = false
    error.value = 'Enter a valid email address.'
    return
  }

  error.value = ''
  success.value = true
  email.value = ''
}
</script>

<template>
  <footer id="footer" class="bg-forest-950 text-cream-100">
    <div class="mx-auto grid max-w-[1180px] gap-8 px-6 py-12 md:grid-cols-[1.5fr_0.7fr_0.9fr_0.7fr] lg:gap-10 lg:px-8">
      <section>
        <h2 class="text-[19px] font-bold">Join the NaijaLife community</h2>
        <p class="mt-3 text-[13px] font-medium text-cream-100/75">Get tips, new arrivals & exclusive offers.</p>
        <form class="mt-6 flex max-w-[360px] flex-col gap-2 sm:flex-row md:flex-col lg:flex-row" @submit.prevent="submit" novalidate>
          <label class="sr-only" for="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="Enter your email"
            class="h-12 min-w-0 flex-1 rounded bg-cream-50 px-5 text-[13px] font-medium text-forest-950 placeholder:text-forest-950/35 focus:outline-none focus:ring-2 focus:ring-gold-300"
            :aria-invalid="Boolean(error)"
            aria-describedby="newsletter-message"
          />
          <button class="h-12 rounded bg-olive-300 px-6 text-[13px] font-bold text-forest-950 transition hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300" type="submit">
            Subscribe
          </button>
        </form>
        <p id="newsletter-message" class="mt-3 min-h-5 text-[12px] font-bold" :class="error ? 'text-gold-300' : 'text-olive-200'">
          {{ error || (success ? 'You are on the list.' : '') }}
        </p>
      </section>

      <section>
        <h2 class="text-[16px] font-bold">Shop</h2>
        <ul class="mt-4 space-y-2 text-[13px] font-medium text-cream-100/78">
          <li><a href="#best-sellers" class="hover:text-gold-300">All Products</a></li>
          <li><a href="#shop" class="hover:text-gold-300">Snacks & Pantry</a></li>
          <li><a href="#shop" class="hover:text-gold-300">Drinks & Mixes</a></li>
          <li><a href="#shop" class="hover:text-gold-300">Sleep & Recovery</a></li>
          <li><a href="#bundles" class="hover:text-gold-300">Bundles</a></li>
        </ul>
      </section>

      <section>
        <h2 class="text-[16px] font-bold">Customer Care</h2>
        <ul class="mt-4 space-y-2 text-[13px] font-medium text-cream-100/78">
          <li><a href="#footer" class="hover:text-gold-300">FAQs</a></li>
          <li><a href="#footer" class="hover:text-gold-300">Shipping & Delivery</a></li>
          <li><a href="#footer" class="hover:text-gold-300">Returns & Refunds</a></li>
          <li><a href="#footer" class="hover:text-gold-300">Track Order</a></li>
          <li><a href="#footer" class="hover:text-gold-300">Contact Us</a></li>
        </ul>
      </section>

      <section>
        <h2 class="text-[16px] font-bold">Follow Us</h2>
        <div class="mt-5 flex gap-4">
          <a href="#footer" aria-label="Follow NaijaLife on Instagram" class="rounded-full text-cream-100 transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300">
            <Instagram :size="23" stroke-width="1.7" />
          </a>
          <a href="#footer" aria-label="Follow NaijaLife on TikTok" class="rounded-full text-cream-100 transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300">
            <Music2 :size="23" stroke-width="1.7" />
          </a>
          <a href="#footer" aria-label="Message NaijaLife on WhatsApp" class="rounded-full text-cream-100 transition hover:text-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-300">
            <MessageCircle :size="23" stroke-width="1.7" />
          </a>
        </div>
      </section>
    </div>

    <div class="mx-auto flex max-w-[1180px] flex-col gap-4 border-t border-cream-100/12 px-6 py-5 text-[12px] font-medium text-cream-100/76 sm:flex-row sm:items-center sm:justify-between lg:px-8">
      <p>© 2024 NaijaLife. All rights reserved.</p>
      <div class="flex gap-8">
        <a href="#footer" class="hover:text-gold-300">Privacy Policy</a>
        <a href="#footer" class="hover:text-gold-300">Terms & Conditions</a>
      </div>
    </div>
  </footer>
</template>
