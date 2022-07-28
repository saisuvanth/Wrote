export enum NodeEnum {
	BOARD = 'Board', NOTE = 'Note', TODO = 'To-do', LINE = 'Line', LINK = 'Link'
}

export const getRequired = (type: string, match: string): boolean => {
	if (type === match) return true;
	return false;
}