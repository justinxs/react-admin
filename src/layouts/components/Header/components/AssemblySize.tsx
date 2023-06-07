import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { setAssemblySize } from '@/redux/reducers/global';
import { useAppSelector, useAppDispatch } from '@/redux/store';

const AssemblySize = () => {
	const assemblySize = useAppSelector(state => state.global.assemblySize);
	const dispatch = useAppDispatch();

	// 切换组件大小
	const onClick = (e: MenuInfo) => {
		dispatch(setAssemblySize(e.key as 'large' | 'small' | 'middle'));
	};
	const items: MenuProps['items'] = [
		{
			key: 'middle',
			disabled: assemblySize == 'middle',
			label: <span>默认</span>,
			onClick
		},
		{
			disabled: assemblySize == 'large',
			key: 'large',
			label: <span>大型</span>,
			onClick
		},
		{
			disabled: assemblySize == 'small',
			key: 'small',
			label: <span>小型</span>,
			onClick
		}
	];
	return (
		<Dropdown menu={{ items }} placement="bottom" trigger={['click']} arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};

export default AssemblySize;
