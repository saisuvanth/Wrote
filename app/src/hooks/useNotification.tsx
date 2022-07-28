import { useContext, createContext, FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotifType } from "../types";

const NotificationContext = createContext<({ message, type }: NotifType) => void>({} as any);

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error('useNotification must be used within a NotificationContext')
	};
	return context;
};

let num = 0;

export const notify = ({ message, type }: NotifType) => {
	toast[type](message, {
		position: toast.POSITION.TOP_CENTER,
		toastId: num
	});
	num = num >= 1000 ? 0 : num + 1;
};

interface props {
	children: JSX.Element;
}
export const NotificationProvider: FC<props> = ({ children }) => {

	return (
		<NotificationContext.Provider value={notify}>
			<ToastContainer />
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContext;
