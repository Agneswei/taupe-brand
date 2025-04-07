import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../data/products';

// Define the cart item type
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color?: string;
};

// Define the cart state
type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

// Define the cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number, size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number, size: string, quantity: number } }
  | { type: 'CLEAR_CART' };

// Define the cart context type
type CartContextType = {
  cart: CartState;
  addToCart: (product: Product, size: string, quantity: number, color?: string) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
};

// Initial cart state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
        };
      } else {
        // Item doesn't exist, add it
        updatedItems = [...state.items, action.payload];
      }

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => !(item.id === action.payload.id && item.size === action.payload.size)
      );

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload;

      // If quantity is zero or negative, remove the item
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id, size } });
      }

      const updatedItems = state.items.map(item => 
        (item.id === id && item.size === size) 
          ? { ...item, quantity } 
          : item
      );

      // Calculate new totals
      const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const totalPrice = updatedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

      return {
        ...state,
        items: updatedItems,
        totalItems,
        totalPrice
      };
    }

    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
};

// Create the cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (product: Product, size: string, quantity: number, color?: string) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size,
      color
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
  };

  // Remove item from cart
  const removeFromCart = (id: number, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  };

  // Update item quantity
  const updateQuantity = (id: number, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};