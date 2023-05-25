import { legacy_createStore as createStore, combineReducers, Store, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import global from './modules/global/reducer';
import menu from './modules/menu/reducer';
import tabs from './modules/tabs/reducer';
import auth from './modules/auth/reducer';
import breadcrumb from './modules/breadcrumb/reducer';

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	global,
	menu,
	tabs,
	auth,
	breadcrumb
});

// redux 持久化配置
const persistConfig = {
	key: 'redux-state',
	storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
