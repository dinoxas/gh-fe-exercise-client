import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'
import { BasketContext } from '~/context'
import { BasketItem, Product } from '~/types'
import { Basket } from '~/components/Basket'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const { addToBasket, basketItems, removeFromBasket } = useContext(BasketContext);

	const [products, setProducts] = useState([]);
	const [showBasket, setshowBasket] = useState(false);

	useEffect( () => {
	  const fetchProductData = async () => {
	    const res = await fetch('/api/products');
		const json = await res.json();

		const categorisedData = json?.reduce((acc, curr) => {
		  const { id, category, name, price, image } = curr;
		  if (!acc[category.name]) {
		    acc[category.name] = {
			  items: [],
			};
		  }
		  acc[category.name].items.push({ category: category.name, id, name, price, image });
		  return acc;
		}, {});

		setProducts(categorisedData);
		return categorisedData;
	  };
	  fetchProductData();
	}, []);

	const toggle = () => setshowBasket(!showBasket);
	const handleRemoveFromBasket = (product:Product) => removeFromBasket(product);

	return (
	  <main className={`bg-white flex min-h-screen flex-col items-center justify-between overflow-hidden ${inter.className}`}>
        <div className='mx-auto px-4 lg:max-w-7xl py-10'>
		  <div className='flex items-center justify-between'>
		    <h1 className='text-2xl font-bold text-gray-800'>Black Friday deals</h1>
			{ 
		    !showBasket && 
              <button 
                className='py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 transition duration-150 ease-in'
                onClick={toggle}
            >
              <svg className='h-8 w-8' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
                <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
              </svg>
			  { basketItems.length >=1 && 
			    <span className='absolute inset-0 object-right-top -mr-6'>
                  <span className='inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold bg-red-500 text-white'>
                    { basketItems.length }
                  </span>
                </span> }
			  </button>
		  }
		  </div>
          <div className='mx-auto max-w-7xl'>
		    {
			  Object.keys(products).map((key) => {
			    return (
				  <div key={key}>
					<h2 className='text-indigo-600 text-xl font-bold mt-8'>{ key }</h2>
					<hr className='h-px mt-2 border-0 bg-indigo-600 mb-5' />
					<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
					  {
					    products[key].items.map(({ category, id, image, name, price }: Product) => (
						  <div 
						    key={ id } 
						    className='max-w-[384px] mx-auto relative bg-cover group rounded-2xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer'
						  >
                            <img className='object-cover' loading='lazy' src={ image } alt={ name } />
							<div className='absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-300 group-hover:shadow-indigo-100 group-hover:bg-indigo-50'>
                              <h2 className='font-semibold text-gray-800'>{ name }</h2>
						      <div className='flex items-center justify-between mt-2'>
                                <h4>
							      <span className='font-semibold text-xl text-indigo-600'>£{ price }</span> <del className='text-md text-indigo-300'>£{ (Number(price) + 20) }</del>
						        </h4>
						        <div className='flex justify-between items-center'>
						          {
							        !basketItems.find((it:any) => it.id === id) ? (
								      <button 
								        className='px-4 py-2 bg-indigo-500 text-white text-xs font-bold rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'
								        onClick={() => {
								          addToBasket({ category, id, price, image, name })
								        }}
								       >
								        Add to basket
								       </button>
							        ) : (
								          <div className='flex gap-4'>
								            <button
								              className='flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600'
								              onClick={() => {
									           addToBasket({ category, id, price, image, name })
								              }}
								            >
								              +
								            </button>
											<p className='self-center text-gray-600'>{ basketItems.find((it:any) => it.id === id).quantity }</p>
											<button
											  className='flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500'
											  onClick={() => {
												const basketItem = basketItems.find((it:BasketItem) => it.id === id);
												if (basketItem.quantity === 1) {
												  handleRemoveFromBasket({ category, id, price, image, name });
												} else {
												  removeFromBasket({ category, id, price, image, name });
												}
											  }}
											>
								  			  -
											</button>
										  </div>
										)
									}
              						</div>
								</div>
                    		  </div>
							</div>
							))
						}
						</div>
					</div>
				  )
				})
				}
            </div>                           
          </div>
		  <Basket {... { showBasket, toggle }} />
	  </main>
	);
}
