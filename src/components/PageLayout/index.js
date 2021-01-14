import clsx from 'clsx';
import { string, node, arrayOf, shape } from 'prop-types';

// Styles
import './styles.scss';

const PageLayout = ({ additonalClasses, menuItems, children, ...rest }) => {
	return (
		<div className={clsx('bokl-page-layout', additonalClasses)} {...rest}>
			{menuItems && <div className="bokl-page-layout__navigation">{menuItems}</div>}
			<div className="bokl-page-layout__main">
				<div className="bokl-page-layout__header"> this where logo with header comes</div>
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
