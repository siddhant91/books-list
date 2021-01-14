// Components
import Home from './pages/home';

// Providers
import { AppProvider } from './contexts/AppContext';

function App() {
	return (
		<AppProvider>
			<div className="App">
				<Home />
			</div>
		</AppProvider>
	);
}

export default App;
