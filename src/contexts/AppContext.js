import { useState, createContext } from 'react';
import { node } from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [loaderVisible, setLoaderVisible] = useState(false);

	return (
		<AppContext.Provider value={[loaderVisible, setLoaderVisible]}>{children}</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: node.isRequired,
};
console.log(1);
setTimeout(() => {
	console.log(2);
}, 1000);

export { AppContext, AppProvider };
