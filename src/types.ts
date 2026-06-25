export interface Product {
  id: string
  name: string
  detail?: string
  price: string
  priceValue?: number
  visual: 'zobo' | 'suya' | 'tiger' | 'ginger' | 'sleep' | 'bundle-a' | 'bundle-b' | 'bundle-c' | 'bundle-d' | 'bundle-e'
  category?: string
  description?: string
  tags?: string[]
}

export interface CatalogueProduct extends Product {
  priceValue: number
  category: string
  description: string
  tags: string[]
}

export interface CartLine {
  product: CatalogueProduct
  quantity: number
}
