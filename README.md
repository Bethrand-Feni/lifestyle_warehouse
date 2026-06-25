# NaijaLife Ecommerce Landing Page

A responsive Vue 3, TypeScript, Vite, and Tailwind CSS landing page for a premium Nigerian wellness and pantry ecommerce store.

## Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `VITE_WHATSAPP_PHONE` to the delivery WhatsApp account number in international format, without `+` or spaces.

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
- `src/components/PromoPanel.vue`
- `src/components/Footer.vue`

The shop catalogue reads product data from `src/data/products.json`. Cart state is managed and persisted in `src/App.vue`, while `src/components/ShopCatalogue.vue` handles product filtering, search, quantity controls, cart review, delivery details, and WhatsApp checkout.

Checkout opens WhatsApp with the cart contents, customer name, phone number, delivery area, notes, and total. Payment is collected on delivery.

Carousel controls use smooth native scrolling, and the newsletter form validates email input before showing a success state.
