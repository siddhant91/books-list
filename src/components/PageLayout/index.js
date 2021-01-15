import clsx from 'clsx';
import { string, node, arrayOf, shape } from 'prop-types';

import LogoImage from '../../assets/images/Logo.png';

// Styles
import './styles.scss';

const PageLayout = ({ additonalClasses, menuItems, children, ...rest }) => {
	return (
		<div className={clsx('bokl-page-layout', additonalClasses)} {...rest}>
			{menuItems.length > 0 && <div className="bokl-page-layout__navigation" />}
			<div className="bokl-page-layout__main">
				<header className="bokl-page-layout__header d-flex align-items-center">
					<img className="bokl-page-layout__header--logo" src={LogoImage} alt="Logo" />
				</header>
				<main className="bokl-page-layout__content">{children}</main>
			</div>
		</div>
	);
};

PageLayout.propTypes = {
	additonalClasses: string,
	menuItems: arrayOf(shape({})).isRequired,
	children: node,
};

PageLayout.defaultProps = {
	additonalClasses: '',
	children: null,
};

export default PageLayout;
