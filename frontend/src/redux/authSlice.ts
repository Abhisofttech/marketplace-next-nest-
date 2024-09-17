// redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  user: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   productId: string;
//   quantity: number;
//   price: number;
//   name: string;
// }

// interface AuthState {
//   isLoggedIn: boolean;
//   user: any;
//   cartItems: CartItem[];
//   totalPrice: number;
//   address: string | null;
// }

// const initialState: AuthState = {
//   isLoggedIn: false,
//   user: null,
//   cartItems: [],
//   totalPrice: 0,
//   address: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<any>) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       state.cartItems = [];
//       state.totalPrice = 0;
//       state.address = null;
//     },
//     setCartDetails: (state, action: PayloadAction<{ cartItems: CartItem[], totalPrice: number, address: string }>) => {
//       const { cartItems, totalPrice, address } = action.payload;
//       state.cartItems = cartItems;
//       state.totalPrice = totalPrice;
//       state.address = address;
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.totalPrice = 0;
//       state.address = null;
//     },
//   },
// });

// export const { login, logout, setCartDetails, clearCart } = authSlice.actions;
// export default authSlice.reducer;
