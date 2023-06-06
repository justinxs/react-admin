import { Switch } from 'antd';
import { useAppSelector, useAppDispatch } from '@/redux';
import { setThemeConfig } from '@/redux/modules/global/action';

const SwitchDark = () => {
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const dispatch = useAppDispatch();
	const onChange = (checked: boolean) => {
		dispatch(setThemeConfig({ ...themeConfig, isDark: checked }));
	};

	return <Switch className="dark" defaultChecked={themeConfig.isDark} checkedChildren={<>🌞</>} unCheckedChildren={<>🌜</>} onChange={onChange} />;
};

export default SwitchDark;
