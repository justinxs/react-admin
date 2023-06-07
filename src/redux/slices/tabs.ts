import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TabsState } from '@/redux/interface';
import { HOME_URL } from '@/config/config';

const initialState: TabsState = {
	// tabsActive 其实没啥用，使用 pathname 就可以了😂
	tabsActive: HOME_URL,
	tabsList: [{ title: '首页', path: HOME_URL }]
};

export const tabsSlice = createSlice({
	name: 'tabs',
	initialState,
	reducers: {
		setTabsList: (state, action: PayloadAction<Menu.MenuOptions[]>) => {
			state.tabsList = action.payload;
		},
		setTabsActive: (state, action: PayloadAction<string>) => {
			state.tabsActive = action.payload;
		}
	}
});

export const { setTabsActive, setTabsList } = tabsSlice.actions;

export default tabsSlice.reducer;
