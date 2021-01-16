/**
 * Landing Page of the Books List Application
 * Sets the App Level by making an Api Call
 */

import { useContext, useEffect, useState } from 'react';

// Network
import NetworkUtils from '../../network';

// Components
import PageLayout from '../../components/PageLayout';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import BooksList from '../../components/BooksList';
import SearchBookForm from '../../components/SearchBookForm';
import GenericModal from '../../components/GenericModal';
// Context
import { AppContext } from '../../contexts/AppContext';
import { BookContext } from '../../contexts/BookContext';

// Styles
import './styles.scss';

/**
 * Local menu Items
 */
const menuItems = [
	{
		title: 'Content Management',
		icon: 'fa-window-maximize',
		isAccordion: true,
	},
	{
		title: 'Courses',
		icon: 'fa-file',
		isAccordion: false,
	},
];

const Home = () => {
	const [loaderVisible, setLoaderVisible] = useContext(AppContext);
	const [booksList, setBooksList] = useContext(BookContext);
	const [error, setError] = useState('');
	const [modalStatus, setModalStatus] = useState('');

	/**
	 * Method to fetch the Books List Based on the Search Text
	 * @param {*} searchText
	 * On Success Sets the data into context, on faqilure shoows generic Modal
	 */
	const getBooksList = async (searchText) => {
		try {
			setLoaderVisible(true);
			const result = await NetworkUtils.makeApiRequest({
				url: '',
				params: {
					q: searchText || 'kaplan test prep',
				},
			});

			const { responseData } = result;
			if (responseData) {
				const { items = [] } = responseData;
				if (items.length) {
					setBooksList(items);
				}
			}
		} catch (e) {
			setError(e.errorMessage);
			setModalStatus(true);
		} finally {
			setLoaderVisible(false);
		}
	};

	/**
	 * useEffect to fetch the books , if not available
	 */
	useEffect(() => {
		if (!booksList.length) {
			getBooksList();
		}
	}, []);

	/**
	 * Method to close the Modal
	 */
	const handleModalClose = () => {
		setModalStatus(false);
	};
	/**
	 * Place Holder to create a New book
	 */
	const createNewBook = () => {};
	return (
		<div className="bokl-homepage">
			<PageLayout menuItems={menuItems}>
				{loaderVisible && <Loader />}
				<div className="bokl-homepage--content">
					<div className="bokl-homepage--content__title d-flex flex-column flex-lg-row justify-content-between">
						<h1>Books</h1>
						<Button handleClick={createNewBook} data-testid="create-book">
							Create New Book
						</Button>
					</div>
					<div className="bokl-homepage--content__main">
						<SearchBookForm getBooksList={getBooksList} />
						<BooksList booksData={booksList} />
					</div>
				</div>
				{modalStatus && (
					<GenericModal
						modalStatus={modalStatus}
						handleClose={handleModalClose}
						closeIconLabel="Close Modal"
					>
						<p className="bokl-text-input--error-text" data-testid="generic-error">
							{error}
						</p>
					</GenericModal>
				)}
			</PageLayout>
		</div>
	);
};

export default Home;
