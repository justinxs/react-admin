import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { useAppSelector } from '@/redux/store';

const BreadcrumbNav = () => {
	const { pathname } = useLocation();
	const breadcrumb = useAppSelector(state => state.global.themeConfig.breadcrumb);
	const breadcrumbList = useAppSelector(state => state.breadcrumb.breadcrumbList[pathname] || []);

	const breadcrumbItems = [
		{
			title: <Link to={HOME_URL}>首页</Link>,
			key: 'home'
		}
	].concat(breadcrumbList.filter((title: string) => title !== '首页').map((title: string) => ({ key: title, title })));
	return <>{!breadcrumb && <Breadcrumb items={breadcrumbItems}></Breadcrumb>}</>;
};

export default BreadcrumbNav;
