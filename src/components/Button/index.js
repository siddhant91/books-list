import { node, string, bool, func, oneOf } from 'prop-types';
import clsx from 'clsx';

// Styles
import './styles.scss';

function Button({
	additionalClasses,
	appearance,
	size,
	children,
	disabled,
	handleClick,
	...props
}) {
	return (
		<button
			type="button"
			className={clsx(additionalClasses, appearance, size, 'bokl-button-component', {
				disabled,
			})}
			disabled={disabled}
			onClick={handleClick}
			data-testid="button"
			{...props}
		>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: node.isRequired,
	disabled: bool,
	handleClick: func.isRequired,
	additionalClasses: string,
	appearance: oneOf(['primary', 'secondary', 'link']),
	size: oneOf(['medium', 'large', 'small']),
};

Button.defaultProps = {
	disabled: false,
	additionalClasses: '',
	appearance: 'primary',
	size: 'medium',
};

export default Button;
