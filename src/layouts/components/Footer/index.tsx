import { useAppSelector } from '@/redux/store';
import './index.less';

const LayoutFooter = () => {
	const footer = useAppSelector(state => state.global.themeConfig.footer);
	
	return (
		<>
			{!footer && (
				<div className="footer">
					<a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
						2022 © Hooks-Admin By Hooks Technology.
					</a>
				</div>
			)}
		</>
	);
};

export default LayoutFooter;
