import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useAppSelector, useAppDispatch } from '@/redux/store';
import { setLanguage } from '@/redux/reducers/global';

const Language = () => {
	const language = useAppSelector(state => state.global.language);
	const dispatch = useAppDispatch();

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <span>简体中文</span>,
			onClick: () => dispatch(setLanguage('zh')),
			disabled: language === 'zh'
		},
		{
			key: '2',
			label: <span>English</span>,
			onClick: () => dispatch(setLanguage('en')),
			disabled: language === 'en'
		}
	];
	return (
		<Dropdown menu={{ items }} placement="bottom" trigger={['click']} arrow={true}>
			<i className="icon-style iconfont icon-zhongyingwen"></i>
		</Dropdown>
	);
};

export default Language;
