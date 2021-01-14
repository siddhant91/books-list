import clsx from 'clsx';
import { node, string } from 'prop-types';

// styles
import './styles.scss';

function Card({ additionalClasses, children, ...rest }) {
	return (
		<div className={clsx('bokl-card', additionalClasses)} {...rest}>
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
