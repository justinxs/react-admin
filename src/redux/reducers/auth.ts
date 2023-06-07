import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/redux/interface';

const initialState: AuthState = {
	authButtons: {},
	authRouter: []
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthButtons: (state, action: PayloadAction<{ [propName: string]: any }>) => {
			state.authButtons = action.payload;
		},
		setAuthRouter: (state, action: PayloadAction<string[]>) => {
			state.authRouter = action.payload;
		}
	}
});

export const { setAuthButtons, setAuthRouter } = authSlice.actions;

export default authSlice.reducer;
