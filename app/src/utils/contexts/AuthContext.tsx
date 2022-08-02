import { createContext, FC, useEffect, useState } from "react";
import { IAuthContext } from "../../types";
import axios from "axios";

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

type AuthContextProps = {
	children: JSX.Element | JSX.Element[];
}

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
	const [isLogged, setLogged] = useState(true);
	const [isLogging, setLogging] = useState(false);

	const revalidate = () => {
		setLogging(true);
		// fetch('https://wrote-server.herokuapp.com/auth/check', { credentials: 'include' }).then(res => res.json()).then(json => {
		// 	console.log(json)
		// 	if (json.status === 200) {
		// 		setLogging(false);
		// 		setLogged(true);
		// 	}
		// }).catch(err => {
		// 	if (err.response.status === 401) {
		// 		setLogging(false);
		// 		setLogged(false);
		// 	}
		// })
		const api = axios.create({
			baseURL: 'https://wrote-server.herokuapp.com/', withCredentials: true, headers: {
				// Cookie: `${document.cookie}`
			}
		});
		api.get('/auth/check').then(res => {
			console.log(res.data);
			if (res.status === 200) {
				setLogging(false);
				setLogged(true);
			}
		}).catch(err => {
			console.log(err);
			if (err.response.status === 401) {
				setLogging(false);
				setLogged(false);
			}
		})
	}

	useEffect(() => {
		console.log('changed');
		// if (!isLogged) revalidate();
	}, []);

	return (
		<AuthContext.Provider value={{ isLogged, isLogging, setLogged, setLogging }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;