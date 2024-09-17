// redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  address: any; // Assuming you want to store address as well
}

const initialState: CartState = {
  cartItems: [],
  totalPrice: 0,
  address: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },
    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload;
    },
    setAddresses: (state, action: PayloadAction<any>) => {
      state.address = action.payload;
    },
  },
});

export const { setCartItems, setTotalPrice, setAddresses } = cartSlice.actions;
export default cartSlice.reducer;
