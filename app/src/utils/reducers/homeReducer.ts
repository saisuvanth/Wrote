import { IBreadCrumb, IHomeAction, IHomeState, IUpdateNode, Node } from "../../types";
import { HomeActionEnum } from "../constants";

function checkAndUpdate(nodes: Node[], { new_node, index }: IUpdateNode) {
	nodes[index] = new_node;
	return nodes;
}

function getBreadCrumbs(breadCrumbs: IBreadCrumb[], bread: IBreadCrumb | undefined, reduce: string | undefined): IBreadCrumb[] {
	if (reduce && bread) {
		if (breadCrumbs.findIndex(br => br.path === reduce) === -1) {
			return [...breadCrumbs, bread];
		}
		return breadCrumbs.slice(0, breadCrumbs.findIndex(br => br.path === reduce) + 1)
	}
	else if (bread) {
		return [...breadCrumbs, bread];
	}
	else {
		return [...breadCrumbs]
	}
}

const changeNodeId = (nodes: Node[], new_id: string, index: number) => {
	nodes[index]._id = new_id;
	return nodes;
}

export default function homeReducer(state: IHomeState, action: IHomeAction): IHomeState {
	switch (action.type) {
		case HomeActionEnum.SET_BREADCRUMBS:
			return { ...state, breadcrumbs: action.payload }
		case HomeActionEnum.SET_ID:
			return { ...state, nodes: changeNodeId(state.nodes, action.payload.new_id, action.payload.index) };
		case HomeActionEnum.SET_NODE:
			return { ...state, nodes: [...state.nodes, action.payload] };
		case HomeActionEnum.UPDATE_NODE:
			return { ...state, nodes: checkAndUpdate(state.nodes, action.payload) };
		case HomeActionEnum.SET_ACTIVE:
			return { ...state, activeNav: action.payload };
		case HomeActionEnum.NODE_CHANGE:
			return { ...state, breadcrumbs: getBreadCrumbs(state.breadcrumbs, action.payload?.breadcrumb, action.payload?.reduce), nodes: action.payload.nodes }
		case HomeActionEnum.DEL_NODE:
			return { ...state, nodes: [...state.nodes.splice(action.payload, 1)] };
		default:
			return state;
	}

}