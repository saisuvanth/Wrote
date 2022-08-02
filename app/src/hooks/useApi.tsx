import { CropSquareRounded, Home } from "@mui/icons-material";
import axios from "axios";
import { Dispatch, SetStateAction, useContext } from "react";
import { useParams } from "react-router-dom";
import { IBreadCrumb, Node, INoteNode } from "../types";
import { HomeActionEnum, NotifEnum } from "../utils/constants";
import HomeContext from "../utils/contexts/HomeContext";
import NotificationContext from "./useNotification";

const url = 'https://wrote-server.herokuapp.com/nodes';

const useApi = () => {
	const { dispatch } = useContext(HomeContext);
	const notify = useContext(NotificationContext);
	const { id } = useParams();
	axios.defaults.withCredentials = true;
	const api = axios.create({
		withCredentials: true,
		baseURL: 'https://wrote-server.herokuapp.com/'
	});

	const getNodes = async (id: string) => {
		const res = await api.get(`${url}/${id === '/' ? '' : id}`);
		if (res.data.message === 'OK') {
			console.log(res.data);
			const data = res.data.result.nodes;
			const nodes = data.children;
			let breadcrumb: IBreadCrumb;
			if (id === '/') {
				breadcrumb = { name: data.name, path: id, icon: Home };
			} else {
				breadcrumb = { name: data.name, path: id, icon: CropSquareRounded };
			}
			dispatch({ type: HomeActionEnum.NODE_CHANGE, payload: { breadcrumb, nodes: nodes, reduce: id } });
		}
		return 'hehe';
	}

	const createNode = (node: Node, index: number, path: string = id ? id : '/nodes/') => {
		api.post(url + path, { ...node }).then(res => {
			dispatch({ type: HomeActionEnum.SET_ID, payload: { new_id: res.data.id, index: index } });
		}).catch(err => console.log(err));
	}

	const updateNode = (cNode: INoteNode, index: number, path: string = id ? `/${id}` : '/') => {
		const { _id, ...node } = cNode;
		if (_id.length > 24) {
			api.post(url + path, { ...node }).then(res => {
				dispatch({ type: HomeActionEnum.SET_ID, payload: { new_id: res.data.id, index: index } });
			}).catch(err => console.log(err));
		} else {
			api.post(url + path, { ...cNode }).then(res => {
				console.log(res);
			}).catch(err => console.log(err));
		}
	}

	const login = (data: any) => {
		api.post('/auth/login', data).then(res => {
			console.log(res);
			if (res.status === 200) {
				notify({ type: NotifEnum.SUCCESS, message: res.data.message });
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			} else {
				notify({ type: NotifEnum.ERROR, message: 'Login Failed' });
			}
		})
	}

	const revalidate = (setLogging: Dispatch<SetStateAction<boolean>>, setLogged: Dispatch<SetStateAction<boolean>>) => {
		setLogging(true);
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

	return { getNodes, updateNode, createNode, login, revalidate };
}

export default useApi;