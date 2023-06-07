import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BreadcrumbState } from '@/redux/interface';

const initialState: BreadcrumbState = {
	breadcrumbList: {}
};

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setBreadcrumbList: (state, action: PayloadAction<{ [propName: string]: any }>) => {
			state.breadcrumbList = action.payload;
		}
	}
});

export const { setBreadcrumbList } = tabsSlice.actions;

export default tabsSlice.reducer;
