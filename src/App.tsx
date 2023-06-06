import { useState, useEffect } from 'react';
import { getBrowserLang } from '@/utils/util';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import { useAppSelector, useAppDispatch } from '@/redux';
import { setLanguage } from '@/redux/modules/global/action';
import { HashRouter } from 'react-router-dom';
import AuthRouter from '@/routers/utils/authRouter';
import Router from '@/routers/index';
import useTheme from '@/hooks/useTheme';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import i18n from 'i18next';
import 'dayjs/locale/zh-cn';
import StaticAction from './staticAction';

const App = () => {
	const language = useAppSelector(state => state.global.language);
	const assemblySize = useAppSelector(state => state.global.assemblySize);
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const dispatch = useAppDispatch();
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	// 全局使用主题
	useTheme(themeConfig);

	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == 'zh') return setI18nLocale(zhCN);
		if (language && language == 'en') return setI18nLocale(enUS);
		if (getBrowserLang() == 'zh') return setI18nLocale(zhCN);
		if (getBrowserLang() == 'en') return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		dispatch(setLanguage(language || getBrowserLang()));
		setAntdLanguage();
	}, [language]);

	return (
		<HashRouter>
			<ConfigProvider
				locale={i18nLocale}
				componentSize={assemblySize}
				theme={{ algorithm: themeConfig.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }}
			>
				<AntApp style={{ height: '100%' }}>
					<AuthRouter>
						<Router />
					</AuthRouter>
					<StaticAction />
				</AntApp>
			</ConfigProvider>
		</HashRouter>
	);
};

export default App;
