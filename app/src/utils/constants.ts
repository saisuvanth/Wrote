import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import NotesIcon from '@mui/icons-material/Notes';
import PlaylistAddCheckSharpIcon from '@mui/icons-material/PlaylistAddCheckSharp';
import AddLinkIcon from '@mui/icons-material/AddLink';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { IHomeState, INavItem } from '../types';
import { ColorLens, IcecreamOutlined } from '@mui/icons-material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';

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

export const noteNav = [
	{
		icon: FormatBoldIcon
	},
	{
		icon: FormatItalicIcon
	},
	{
		icon: StrikethroughSIcon
	},
	{
		icon: FormatListBulletedIcon
	},
	{
		icon: FormatListNumberedIcon
	},
	{
		icon: FormatAlignCenterIcon
	}
]

export const boardNav = [
	{
		name: 'Color',
		icon: ColorLens
	},
	{
		name: 'Icon',
		icon: IcecreamOutlined
	}
]

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
	SET_BREADCRUMBS, SET_NODE, UPDATE_NODE, SET_ACTIVE, NODE_CHANGE, SET_ID, DEL_NODE, SET_DRAG_FLAG, SET_DRAG_INDEX, SET_NOTE
}


export const defaultHomeState: IHomeState = {
	breadcrumbs: [],
	nodes: [],
	activeNav: false,
}