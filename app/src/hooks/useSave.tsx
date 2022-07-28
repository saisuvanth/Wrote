import { useContext } from "react";
import { NavigateFunction, useLocation } from "react-router-dom";
import { Node } from "../types";
// import { NodeEnum } from "../utils/constants";
import HomeContext from "../utils/contexts/HomeContext";

const useSave = () => {
	const { state: { nodes, breadcrumbs } } = useContext(HomeContext);
	const location = useLocation();

	const handleSaveNodesLocal = (node: Node, navigate: NavigateFunction) => {
		const data = { name: breadcrumbs[breadcrumbs.length - 1].name, nodes: nodes }
		console.log(data);
		localStorage.setItem(breadcrumbs[breadcrumbs.length - 1].path, JSON.stringify(data));
		setTimeout(() => {
			navigate(`${location.pathname}${node._id}`, { replace: true });
		}, 1000);
	}

	return { handleSaveNodesLocal };
}

export default useSave;