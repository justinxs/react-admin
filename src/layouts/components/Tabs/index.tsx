import { Tabs } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { useAppSelector, useAppDispatch } from '@/redux';
import { setTabsList } from '@/redux/modules/tabs/action';
import { routerArray } from '@/routers';
import { searchRoute } from '@/utils/util';
import MoreButton from './components/MoreButton';
import { message } from '@/staticAction';
import './index.less';

const LayoutTabs = () => {
	const tabsList = useAppSelector(state => state.tabs.tabsList);
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	useEffect(() => {
		addTabs();
	}, [pathname]);

	// click tabs
	const clickTabs = (path: string) => {
		navigate(path);
	};

	// add tabs
	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		dispatch(setTabsList(newTabsList));
		setActiveValue(pathname);
	};

	// delete tabs
	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success('你删除了Tabs标签 😆😆😆');
		dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)));
	};

	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						hideAdd
						type="editable-card"
						onEdit={path => {
							delTabs(path as string);
						}}
						items={tabsList.map((item: Menu.MenuOptions) => ({
							key: item.path,
							closable: item.path !== HOME_URL,
							label:
								item.path == HOME_URL ? (
									<>
										<HomeFilled />
										{item.title}
									</>
								) : (
									item.title
								)
						}))}
					></Tabs>
					<MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={(tabs: Menu.MenuOptions[]) => dispatch(setTabsList(tabs))}></MoreButton>
				</div>
			)}
		</>
	);
};

export default LayoutTabs;
