import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { HOME_URL } from '@/config/config';
import { connect } from 'react-redux';

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const { themeConfig } = props.global;
	const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];

	const breadcrumbItems = [
		{
			title: <Link to={HOME_URL}>首页</Link>,
			key: 'home'
		}
	].concat(breadcrumbList.filter((title: string) => title !== '首页').map((title: string) => ({ key: title, title })));
	return <>{!themeConfig.breadcrumb && <Breadcrumb items={breadcrumbItems}></Breadcrumb>}</>;
};

const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps)(BreadcrumbNav);
