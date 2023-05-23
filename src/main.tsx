import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import '@/styles/reset.less';
import '@/assets/iconfont/iconfont.less';
import '@/assets/fonts/font.less';
import '@/styles/common.less';
import '@/language/index';
import 'virtual:svg-icons-register';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	// 	// * react严格模式
	// 	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// 	// </React.StrictMode>
);
