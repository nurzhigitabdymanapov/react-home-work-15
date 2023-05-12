import { createContext, useEffect, useReducer, useState } from "react";
import { fetchRequest } from "../components/feth/fetshApi";

export const cartContext = createContext({
  items: [],
  totalAmount: 0,
});
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload;
    case "GET":
      return action.payload;
    case "INCREMENT":
      return action.payload;
    case "DECREMENT":
      return action.payload;
    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  const addItem = async (id, amount) => {
    try {
      const response = await fetchRequest(`/foods/${id}/addToBasket`, {
        method: "POST",
        body: { amount },
      });
      dispatch({ type: "ADD", payload: response.items });
    } catch (error) {
      new Error(error);
    }
  };

  async function getBasket() {
    try {
      const response = await fetchRequest("/basket");
      dispatch({ type: "GET", payload: response.items });
    } catch (error) {
      new Error(error);
    }
  }
  useEffect(() => {
    getBasket();
  }, []);

  async function increment(id, amount) {
    try {
      const response = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount + 1 },
      });
      dispatch({ type: "INCREMENT", payload: response.items });
      getBasket();
    } catch (error) {
      new Error(error);
    }
  }
  async function decrement(id, amount) {
    try {
      if (amount !== 1) {
        const response = await fetchRequest(`/basketItem/${id}/update`, {
          method: "PUT",
          body: { amount: amount - 1 },
        });
        dispatch({ type: "DECREMENT", payload: response.items });
        getBasket();
      } else {
        const response = await fetchRequest(`/basketItem/${id}/delete`, {
          method: "DELETE",
          body: { amount },
        });
        dispatch({ type: "DECREMENT", payload: response.items });
      }
    } catch (error) {
      new Error(error);
    }
  }
  const amount = cartState?.reduce((prev, current) => prev + current.amount, 0);
  const totalPrice = cartState?.reduce(
    (prev, current) => prev + current.amount * current.price,
    0
  );
  const cartValue = {
    items: cartState,
    addItem,
    totalAmount: amount,
    totalPrice: totalPrice,
    increment,
    decrement,
  };

  return (
    <cartContext.Provider value={cartValue}>{children}</cartContext.Provider>
  );
};
