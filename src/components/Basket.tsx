import { useContext, useState } from 'react'
import { BasketContext } from '~/context';
import { Product } from '~/types'

type Basket = {
  showBasket: boolean
  toggle: () => void
}

export const Basket = ({ showBasket, toggle }: Basket) => {
  const {
    addToBasket,
    basketItems,
    clearBasket,
    getTotal,
    removeFromBasket
  } = useContext(BasketContext);

  const [orderStatus, setOrderStatus] = useState<string>('');

  const postOrders = async (orders: Product[]) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'products': [...orders]}),
    });
  
    const result = await response.json();
    setOrderStatus(`${result?.message}. Your order has been placed successfully!`);
  };

  const handleRemoveFromBasket = (product: Product) => removeFromBasket(product);

  return (
    showBasket && (
        <div className='mx-auto px-4 lg:max-w-7xl py-10 bg-white z-10 flex-col flex fixed inset-0 text-black font-normal'>
          <div>
            <div className='flex justify-between'>
            <button
              className='flex px-4 py-2 mb-5 bg-gray-600 text-md text-white font-bold rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
              onClick={toggle}
            >
              <svg className='h-6 w-6 mr-2 text-white'  width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'> 
                <path stroke='none' d='M0 0h24v24H0z'/>  <path d='M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1' />
              </svg>Continue
            </button>
            <button
                className='flex px-4 py-2 mb-5 bg-gray-600 text-md text-white font-bold rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700'
                onClick={() => {
                  clearBasket();
                  setOrderStatus('');
                }}
            >
              Clear
          </button></div>
            <div className='flex flex-col gap-4'>
              { basketItems.map(({ category, id, image, name, price, quantity }: Product) => (
                  <div className='flex justify-between items-center rounded transition-all duration-300 hover:bg-gray-100 ease-in' key={id}>
                    <div className='flex gap-4'>
                      <img 
                        src={image}
                        alt={name}
                        className='rounded-md w-20 h-20'
                      />
                      <div className='flex gap-8 justify-center'>
                        <div>
                          <p className='text-md font-bold'>{ name }</p>
                          <p className='text-xs text-gray-400'>{ category }</p>
                          <div className='flex gap-4 mt-2'>
                            <button
                              className='flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-indigo-500 hover:bg-indigo-600'
                              onClick={() => {
                                addToBasket({ category, id, price, image, name })
                              }}
                            >
                              +
                            </button>
                            <p>{quantity}</p>
                            <button
                              className='flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500'
                              onClick={() => {
                                const basketItem = basketItems.find((it:Product) => it.id === id);
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
                      </div>
                  </div>
                </div>
                <p className='text-lg font-bold text-indigo-600 pr-4'>£{price}</p>
            </div>
            ))}
          </div>
        </div>
        {
          basketItems.length >= 1 ? (
            <>
            <div className='flex justify-between items-center'>
              <div className='mt-5'>
                <button
                  className='flex px-6 py-3 mb-5 bg-indigo-600 uppercase text-lg text-white font-bold rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700'
                  disabled={!!orderStatus}
                  onClick={() => {
                    postOrders(basketItems);
                  }}
                >
                  Buy now
                </button>
              </div>
              <p className='text-2xl font-bold text-indigo-600 pr-4'>£{ getTotal()?.toLocaleString() }</p>
            </div>
            <p className='text-2xl text-teal-400 text-center'>{ orderStatus && orderStatus }</p>
            </>
            ) : (
            <h1 className='text-lg font-bold text-center'>Basket is empty!</h1>
          )
        }
      </div>
    )
  )
};

