import clsx from 'clsx';
/**
 * Generic Card Component
 */
import { node, string } from 'prop-types';

// styles
import './styles.scss';

function Card({ additionalClasses, children, ...rest }) {
	return (
		<div className={clsx('bokl-card', additionalClasses)} {...rest} data-testid="bokl-card">
			{children}
		</div>
	);
}

Card.propTypes = {
	additionalClasses: string,
	children: node,
};
Card.defaultProps = {
	children: null,
	additionalClasses: '',
};

export default Card;
