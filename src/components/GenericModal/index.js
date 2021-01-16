/**
 * Generic Modal Component
 */

import clsx from 'clsx';
import Modal from 'react-modal';
import { string, node, bool, func } from 'prop-types';

// Styles
import './styles.scss';

const GenericModal = ({
	additionalClasses,
	children,
	closeIconLabel,
	modalStatus,
	handleClose,
	...props
}) => {
	return (
		<Modal
			className={clsx('bokl-modal-component', additionalClasses)}
			isOpen={modalStatus}
			overlayClassName="bokl-modal-component__overlay"
			role="dialog"
			shouldCloseOnOverlayClick
			shouldCloseOnEsc
			ariaHideApp={false}
			onRequestClose={handleClose}
			data-testid="generic-modal"
			{...props}
		>
			<div className="bokl-modal-component__content">{children}</div>

			<button
				type="button"
				className="bokl-modal-component__btn-close"
				onClick={handleClose}
				aria-label={closeIconLabel}
				data-testid="close-icon"
			>
				<i className="fa fa-times" aria-hidden="true" />
			</button>
		</Modal>
	);
};

GenericModal.propTypes = {
	additionalClasses: string,
	children: node.isRequired,
	closeIconLabel: string.isRequired,
	modalStatus: bool,
	handleClose: func.isRequired,
};

GenericModal.defaultProps = {
	additionalClasses: '',
	modalStatus: false,
};

export default GenericModal;
