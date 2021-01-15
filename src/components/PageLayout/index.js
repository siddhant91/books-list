import clsx from 'clsx';
import { string, node, arrayOf, shape } from 'prop-types';
import { useState } from 'react';
// Logo Assets
import LogoImage from '../../assets/images/Logo.png';

// Compoents
import Button from '../Button';
// Styles
import './styles.scss';

const PageLayout = ({ additonalClasses, menuItems, children, ...rest }) => {
	const [isMenuOpen, toggleMenuState] = useState(false);
	const toggleMenu = () => {
		toggleMenuState(!isMenuOpen);
	};
	const getMenuItems = () => {
		const items = menuItems.map((item) => {
			const { title, icon, isAccordion } = item;

			return (
				<Button
					aria-label={title}
					appearance="just-icon"
					size="icon"
					additionalClasses="text-left p-0 d-flex align-items-center mt-3"
				>
					<i className={`fa ${icon}`} aria-hidden="true" />
					<span
						className={clsx('bokl-page-layout__menu--item-title ', {
							'd-flex justify-content-between align-items-center flex-grow-1': isMenuOpen,
						})}
					>
						{title}
						{isAccordion && <i className="fa fa-angle-down" aria-hidden="true" />}
					</span>
				</Button>
			);
		});
		return items;
	};
	const renderMenu = () => {
		return (
			<div
				className={clsx('bokl-page-layout__menu', {
					open: isMenuOpen,
				})}
			>
				<Button
					aria-label="open Menu"
					appearance="just-icon"
					size="icon"
					additionalClasses="text-left p-0 d-flex align-items-center"
					handleClick={toggleMenu}
				>
					<i className="fa fa-bars" aria-hidden="true" />
					<span className="bokl-page-layout__menu--item-title">Menu</span>
				</Button>
				<div className="d-flex flex-column mt-3">{getMenuItems()}</div>
			</div>
		);
	};
	return (
		<div className={clsx('bokl-page-layout', additonalClasses)} {...rest}>
			{renderMenu()}
			<div
				className={clsx('bokl-page-layout__main', {
					'shift-left': isMenuOpen,
				})}
			>
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
