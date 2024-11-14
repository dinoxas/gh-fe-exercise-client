export type Provider = {
  children?: React.ReactNode
}
  
export type BasketItem = {
  id: number
  price:  number
  quantity: number
}

export type Product = {
	id: number
	name?: string
	description?: string
	image?: string
	price: number
	category?: string
  quantity?: number
};