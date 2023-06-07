import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MenuState } from '@/redux/interface';
import { getMenuList } from '@/api/modules/login';

const initialState: MenuState = {
	isCollapse: false,
	menuList: []
};

// * redux-thunk
export const getMenuListActionThunk = createAsyncThunk('menu/getMenuList', async () => {
	const response = await getMenuList();
	return response.data;
});

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		updateCollapse: (state, action: PayloadAction<boolean>) => {
			state.isCollapse = action.payload;
		},
		setMenuList: (state, action: PayloadAction<Menu.MenuOptions[]>) => {
			state.menuList = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addCase(getMenuListActionThunk.fulfilled, (state, action) => {
			state.menuList = action.payload as Menu.MenuOptions[];
		});
	}
});

export const { updateCollapse, setMenuList } = menuSlice.actions;

export default menuSlice.reducer;
