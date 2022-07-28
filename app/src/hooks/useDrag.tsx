import { DragEvent, DragEventHandler, useContext } from 'react';
import { HomeActionEnum, NodeEnum } from '../utils/constants';
import HomeContext from '../utils/contexts/HomeContext';
import type { Node } from '../types';
import { v4 as uuid } from 'uuid';
import useApi from './useApi';

const useDrag = () => {
	const { state: { nodes }, dispatch } = useContext(HomeContext);
	const { updateNode } = useApi();

	const handleDragStart = (event: DragEvent<HTMLDivElement>, flag: 'new' | 'update', item_type: NodeEnum | number) => {
		event.dataTransfer.setData('flag', flag);
		event.dataTransfer.setData('index', item_type.toString());
		// if (flag === 'update') event.currentTarget.style.visibility = 'hidden';
	}

	const getNode = (type: NodeEnum, clientX: number, clientY: number): Node => {
		switch (type) {
			case NodeEnum.BOARD:
				return { _id: uuid(), type, x: clientX, y: clientY, name: '' }
			case NodeEnum.NOTE:
				return { _id: uuid(), type, x: clientX, y: clientY, note: '' }
			case NodeEnum.TODO:
				return { _id: uuid(), type, x: clientX, y: clientY, todos: [] }
			case NodeEnum.LINK:
				return { _id: uuid(), type, x: clientX, y: clientY, link: '' };
			default:
				return { _id: uuid(), type, x: clientX, y: clientY }
		}

	}
	const handleDragOver: DragEventHandler<HTMLDivElement | HTMLLIElement> = (event) => {
		event.preventDefault();
		event.stopPropagation();
	}

	const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
		const { clientX, clientY } = event;
		const flag = event.dataTransfer.getData('flag');
		if (flag === 'new') {
			const item_type: NodeEnum = event.dataTransfer.getData('index') as NodeEnum;
			const node: Node = getNode(item_type, clientX, clientY);
			dispatch({ type: HomeActionEnum.SET_NODE, payload: node });
		} else {
			const index = parseInt(event.dataTransfer.getData('index'));
			const new_node: Node = { ...nodes[index], x: clientX - 50, y: clientY - 50 };
			dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
			updateNode(new_node, index);
		}
	}

	const handleDropBin: DragEventHandler<HTMLLIElement> = (event) => {
		const index = parseInt(event.dataTransfer.getData('index'));
		if (index) {
			dispatch({ type: HomeActionEnum.DEL_NODE, payload: index })
		}
	}


	return { handleDragStart, handleDragOver, handleDrop, handleDropBin }
}

export default useDrag;