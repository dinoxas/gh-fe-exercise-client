import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { BasketProvider } from '~/context'

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
// 	require('../mocks')
// }

/***** 
What have been completed:
a. Products page (home)
- List products grouped by category (but not sorted by)
- Products can be selected and added to a new order
b. Cart/Order view
- List the products added to a given order
- User can change the quantity of products
- User can clear the cart
- User can buy the order
c. Confirmation
- User should be told the order was successfully purchased (success message from API response /api/orders)

Tech decisions:
- Used the Context API for state menagement as implementing something like Redux seemed like an overkill for this
- Used Tailwind for UI as it was already set up

Due to time constraint, I haven't completed the following: 
// Sort function for products
// Missing/incomplete types
// Automated testing
// Adding Loading states
// Adding empty states
// Error states

Things I would improve given more time:
// All of the above
// Filter by category function for products
// Setting up routes for pages e.g: '/products', '/basket' etc instead of just '/'
// Make the code DRY
// Move some of the code into seperate files as sub components which can be shared by products and basket e.g: add/remove quantity UI
// Animations for shopping basket view
// Disable scrolling and pointer events for product view when basket UI is in view
// Implement Sticky header for basket button
// Web vitals optimisations
*****/ 


export default function App({ Component, pageProps }: AppProps) {
	return (
		<BasketProvider>
			<Component {...pageProps} />
		</BasketProvider>
	);
}
