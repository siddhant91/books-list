import { useState, createContext } from 'react';
import { node } from 'prop-types';

const BookContext = createContext();

const BookProvider = ({ children }) => {
	const [booksList, setBooksList] = useState([]);

	return <BookContext.Provider value={[booksList, setBooksList]}>{children}</BookContext.Provider>;
};

BookProvider.propTypes = {
	children: node.isRequired,
};

export { BookContext, BookProvider };
