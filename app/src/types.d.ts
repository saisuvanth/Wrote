import { HomeActionEnum, NodeEnum, NotifEnum } from "./utils/constants";
import { SvgIconComponent } from '@mui/icons-material'
import { EditorState } from "draft-js";

export type IAuthContext = {
	isLogged: boolean;
	isLogging: boolean;
	setLogged: Dispatch<SetStateAction<boolean>>;
	setLogging: Dispatch<SetStateAction<boolean>>
}
export type MyRouteProps = {
	redirectTo?: string;
}

export type IBreadCrumb = {
	name: string;
	path: string;
	icon: SvgIconComponent
}

export type NotifType = {
	message: string;
	type: NotifEnum;
}

export type Todo = {
	title: string;
	completed: boolean;
	due?: Date;
}

export type BaseNode = {
	_id: string;
	type: NodeEnum;
	x: number;
	y: number;
}

export interface IBoardNode extends BaseNode {
	name?: string;
}

export interface ITodoNode extends BaseNode {
	todos?: Todo[];
}

export interface INoteNode extends BaseNode {
	note?: EditorState;
}

export interface ILinkNode extends BaseNode {
	link?: string;
}

export interface ILineNode extends BaseNode {
	x1?: string;
	y1?: string;
}

export type Node = IBoardNode | ITodoNode | INoteNode | ILinkNode | ILineNode;

export type INavItem = {
	name: NodeEnum;
	icon: SvgIconComponent;
}

export type IUpdateNode = {
	index: number;
	new_node: Node;
}

export type IHomeAction = | { type: HomeActionEnum.SET_BREADCRUMBS, payload: IBreadCrumb[] }
	| { type: HomeActionEnum.SET_NODE, payload: Node }
	| { type: HomeActionEnum.SET_ID, payload: { index: number, new_id: string } }
	| { type: HomeActionEnum.UPDATE_NODE, payload: IUpdateNode }
	| { type: HomeActionEnum.SET_ACTIVE, payload: number | boolean }
	| { type: HomeActionEnum.NODE_CHANGE, payload: { reduce?: string, breadcrumb?: IBreadCrumb, nodes: Node[] } }
	| { type: HomeActionEnum.DEL_NODE, payload: number }
	| { type: HomeActionEnum.SET_DRAG_FLAG, payload: boolean }
	| { type: HomeActionEnum.SET_DRAG_INDEX, payload: NodeEnum | number }
	| { type: HomeActionEnum.SET_NOTE, payload: { state: EditorState, index: number } }

export type ComponentNode = {
	node: Node;
	index: number;
}

export type IHomeState = {
	breadcrumbs: IBreadCrumb[];
	nodes: Array<Node>;
	activeNav: number | boolean;
	newDragFlag?: boolean;
	activeDragIndex?: NodeEnum | number;
	curEditorState?: EditorState
}

// export type INoteState = {
// 	_id: string;
// 	editorState: EditorState
// }