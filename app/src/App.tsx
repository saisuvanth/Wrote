import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './hooks/useNotification';
import Home from './pages/Home';
import theme from './utils/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<NotificationProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/:id' element={<Home />} />
					{/* <Route path='' element={}/> */}
				</Routes>
			</NotificationProvider>
		</ThemeProvider>
	);
}

export default App;
