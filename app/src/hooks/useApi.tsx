import { CropSquareRounded, Home } from "@mui/icons-material";
import axios from "axios";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { IBreadCrumb, Node, INoteNode } from "../types";
import { HomeActionEnum } from "../utils/constants";
import HomeContext from "../utils/contexts/HomeContext";

const url = 'http://localhost:8080/nodes';

const useApi = () => {
	const { dispatch } = useContext(HomeContext);
	const { id } = useParams();
	const api = axios.create({
		withCredentials: true,
		baseURL: url
	});

	const getNodes = async (id: string) => {
		const res = await api.get(`${url}/${id === '/' ? '' : id}`);
		if (res.data.message === 'OK') {
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

	const createNode = (node: Node, path: string = id ? id : '/nodes/') => {
		api.post(url + path, { node }).then(res => {
			console.log(res);
		})
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

	return { getNodes, updateNode, createNode };
}

export default useApi;