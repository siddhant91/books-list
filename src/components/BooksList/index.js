/**
 * Component to display the book Cards Based on the Data
 */

import { arrayOf, shape } from 'prop-types';

// Components

import Card from '../Card';

// Styles
import './styles.scss';

const BooksList = ({ booksData }) => {
	/**
	 * Generic method to render the details
	 * @param { label, value }
	 */
	const getCardDetails = ({ label, value }) => {
		return (
			<p className="bokl-books-listing--list__card--details mb-1">
				<span className="bokl-books-listing--list__card--details__label">{label}</span>
				<span>{value || 'N/A'}</span>
			</p>
		);
	};

	/**
	 * Method to loop over the booksData and render the Cards
	 * if data is empty , display text message
	 */
	const getBookCards = () => {
		if (booksData.length) {
			const bookCards = booksData.map((book) => {
				const {
					volumeInfo: { title, authors = [], publisher = '', publishedDate = '' } = {},
				} = book;
				return (
					<Card additionalClasses="bokl-books-listing--list__card" key={title}>
						<h4 className="bokl-books-listing--list__card--title">{title}</h4>
						{getCardDetails({
							label: 'Authors:',
							value: authors.length > 0 ? authors.toString() : 'N/A',
						})}
						{getCardDetails({ label: 'Publisher:', value: publisher })}
						{getCardDetails({ label: 'Publishe Date:', value: publishedDate })}
					</Card>
				);
			});
			return bookCards;
		}
		return <p>Sorry no books to Display</p>;
	};

	return (
		<div className="bokl-books-listing">
			<h2 className="bokl-books-listing--title">All Books</h2>
			<div className="bokl-books-listing--list mt-5 d-flex flex-wrap justify-content-between">
				{getBookCards()}
			</div>
		</div>
	);
};

BooksList.propTypes = {
	booksData: arrayOf(shape({})),
};

BooksList.defaultProps = {
	booksData: [],
};

export default BooksList;
