# NaijaLife Ecommerce Landing Page

A responsive Vue 3, TypeScript, Vite, and Tailwind CSS landing page for a premium Nigerian wellness and pantry ecommerce store.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

- `src/components/Navbar.vue`
- `src/components/HeroSection.vue`
- `src/components/CategoryGrid.vue`
- `src/components/StoryBanner.vue`
- `src/components/ShopCatalogue.vue`
- `src/components/ProductCarousel.vue`
- `src/components/PromoPanel.vue`
- `src/components/BundleCarousel.vue`
- `src/components/Footer.vue`

The shop catalogue reads product data from `src/data/products.json`. Cart state is managed in `src/App.vue`, while `src/components/ShopCatalogue.vue` handles product filtering, quantity controls, cart review, and WhatsApp checkout.

To connect checkout to the real WhatsApp account, replace the `WHATSAPP_PHONE` value in `src/components/ShopCatalogue.vue` with the delivery account number in international format, without `+` or spaces.

Carousel controls use smooth native scrolling, and the newsletter form validates email input before showing a success state.
