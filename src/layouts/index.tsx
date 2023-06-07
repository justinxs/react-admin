import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { setAuthButtons } from '@/redux/reducers/auth';
import { updateCollapse } from '@/redux/reducers/menu';
import { getAuthorButtons } from '@/api/modules/login';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import LayoutMenu from './components/Menu';
import LayoutHeader from './components/Header';
import LayoutTabs from './components/Tabs';
import LayoutFooter from './components/Footer';
import './index.less';

const LayoutIndex = () => {
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	const dispatch = useAppDispatch();

	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		const { data } = await getAuthorButtons();
		dispatch(setAuthButtons(data as { [propName: string]: any }));
	};

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true));
				if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false));
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		getAuthButtonsList();
	}, []);

	return (
		// 这里不用 Layout 组件原因是切换页面时样式会先错乱然后在正常显示，造成页面闪屏效果
		<section className="container">
			<Layout.Sider trigger={null} collapsed={isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Layout.Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				<LayoutTabs></LayoutTabs>
				<Layout.Content>
					<Outlet></Outlet>
				</Layout.Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
};

export default LayoutIndex;
