import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import NotesIcon from '@mui/icons-material/Notes';
import PlaylistAddCheckSharpIcon from '@mui/icons-material/PlaylistAddCheckSharp';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { IHomeState, INavItem } from '../types';

export enum NodeEnum {
	NOTE = 'Note', TODO = 'To-Do', LINK = 'Link', LINE = 'Line', BOARD = 'Board', COLUMN = 'Column'
}

export enum NotifEnum {
	INFO = 'info', ERROR = 'error', SUCCESS = 'success'
}

export const home: INavItem[] = [
	{
		name: NodeEnum.NOTE,
		icon: NotesIcon,
	},
	{
		name: NodeEnum.TODO,
		icon: PlaylistAddCheckSharpIcon,
	},
	{
		name: NodeEnum.LINK,
		icon: AddLinkIcon,
	},
	{
		name: NodeEnum.LINE,
		icon: ArrowRightAltIcon,
	},
	{
		name: NodeEnum.BOARD,
		icon: DashboardCustomizeIcon,
	},
	{
		name: NodeEnum.COLUMN,
		icon: ViewColumnIcon,
	},
];

export const board = [
	{
		name: 'Note',
		icon: NotesIcon,
	},
	{
		name: 'To-do',
		icon: PlaylistAddCheckSharpIcon,
	},
	{
		name: 'Link',
		icon: AddLinkIcon,
	},
	{
		name: 'Line',
		icon: ArrowRightAltIcon,
	}
]

export enum HomeActionEnum {
	SET_BREADCRUMBS, SET_NODE, UPDATE_NODE, SET_ACTIVE, NODE_CHANGE, SET_ID, DEL_NODE
}


export const defaultHomeState: IHomeState = {
	breadcrumbs: [],
	nodes: [],
	activeNav: false,
}