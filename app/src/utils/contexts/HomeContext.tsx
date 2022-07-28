import { createContext, Dispatch, FC, useReducer } from "react";
import { IHomeAction, IHomeState } from "../../types";
import { defaultHomeState } from "../constants";
import homeReducer from "../reducers/homeReducer";

type IHomeContext = {
	state: IHomeState;
	dispatch: Dispatch<IHomeAction>;
}

const HomeContext = createContext<IHomeContext>({} as IHomeContext);

interface HomeContextProviderProps {
	children: JSX.Element | JSX.Element[];
}

const HomeContextProvider: FC<HomeContextProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(homeReducer, defaultHomeState);

	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			{children}
		</HomeContext.Provider>
	)
}

export default HomeContext;
export { HomeContextProvider };