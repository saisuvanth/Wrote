import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './hooks/useNotification';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContextProvider } from './utils/contexts/AuthContext';
import theme from './utils/theme';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { lazy, Suspense } from 'react';
import Signup from './pages/Signup';

const PrivateRoute = lazy(() => import('./components/PrivateRoute'));


function App() {
	return (
		<ThemeProvider theme={theme}>
			<AuthContextProvider >
				<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
					<CssBaseline />
					<NotificationProvider>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
							<Route path='/' element={<Suspense><PrivateRoute /></Suspense>}>
								<Route path='/' element={<Home />} />
								<Route path='/:id' element={<Home />} />
							</Route>
							{/* <Route path='' element={}/> */}
						</Routes>
					</NotificationProvider>
				</GoogleOAuthProvider>
			</AuthContextProvider>
		</ThemeProvider>
	);
}

export default App;
