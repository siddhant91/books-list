import { useEffect, useState, useContext } from 'react';

// Network
import NetworkUtils from '../../network';

// Components
import Card from '../Card';

// Contexts
import { AppContext } from '../../contexts/AppContext';
// Styles
import './styles.scss';

const BooksList = () => {
	const [booksList, setBooksList] = useState([]);
	const [, setLoaderVisible] = useContext(AppContext);

	const getBooksList = async () => {
		try {
			setLoaderVisible(true);
			const result = await NetworkUtils.makeApiRequest({
				url: '',
				params: {
					q: 'kaplan test prep',
				},
				memoizeResponse: true,
			});

			const { responseData } = result;
			if (responseData) {
				const { items = [] } = responseData;
				if (items.length) {
					setBooksList(items);
				}
			}
		} catch (e) {
			console.log(e);
		} finally {
			setLoaderVisible(false);
		}
	};
	useEffect(() => {
		if (!booksList.length) {
			getBooksList();
		}
	}, []);

	const getCardDetails = ({ label, value }) => {
		return (
			<p className="bokl-books-listing--list__card--details mb-1">
				<span className="bokl-books-listing--list__card--details__label">{label}</span>
				<span>{value || 'N/A'}</span>
			</p>
		);
	};

	const getBookCards = () => {
		if (booksList.length) {
			const bookCards = booksList.map((book) => {
				const {
					volumeInfo: { title, authors = [], publisher = '', publishedDate = '' } = {},
				} = book;
				return (
					<Card additionalClasses="bokl-books-listing--list__card">
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

export default BooksList;
