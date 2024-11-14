
import { createContext, useState } from 'react'
import { BasketItem, Provider } from '~/types';

export const BasketContext = createContext({
    basketItems: null,
    addToBasket: null,
    removeFromBasket: null,
    clearBasket: null,
    getTotal: null,
} as any)

export const BasketProvider = ({ children }: Provider) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const clearBasket = () => setBasketItems([]);

  const getTotal = () => basketItems.reduce((total:number, item:BasketItem) => total + item.price * item.quantity, 0);

  const addToBasket = (item: BasketItem) => {
    const isItemInBasket = basketItems.find((basketItem: BasketItem) => basketItem.id === item.id);
    ;
    if (isItemInBasket) {
      setBasketItems(
        basketItems.map((basketItem: BasketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem?.quantity + 1 }
            : basketItem
        )
      );
    } else {
        setBasketItems([...basketItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromBasket = (item: BasketItem) => {
    const isItemInBasket = basketItems.find((basketItem: BasketItem) => basketItem.id === item.id);

    if (isItemInBasket?.quantity === 1) {
      setBasketItems(basketItems.filter((basketItem: BasketItem) => basketItem.id !== item.id));
    } else {
      setBasketItems(
        basketItems.map((basketItem: BasketItem) =>
          basketItem.id === item.id
            ? { ...basketItem, quantity: basketItem.quantity - 1 }
            : basketItem
        )
      );
    }
  };

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addToBasket,
        removeFromBasket,
        clearBasket,
        getTotal,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
