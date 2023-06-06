import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/redux';
import { updateCollapse } from '@/redux/modules/menu/action';

const CollapseIcon = () => {
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	const dispatch = useAppDispatch();

	return (
		<div
			className="collapsed"
			onClick={() => {
				dispatch(updateCollapse(!isCollapse));
			}}
		>
			{isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
		</div>
	);
};

export default CollapseIcon;
