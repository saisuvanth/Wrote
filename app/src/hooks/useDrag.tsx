import { DragEventHandler, useContext } from 'react';
import { HomeActionEnum, NodeEnum } from '../utils/constants';
import HomeContext from '../utils/contexts/HomeContext';
import type { Node } from '../types';
import { v4 as uuid } from 'uuid';
import useApi from './useApi';
import { DraggableEvent } from 'react-draggable';
import { EditorState } from 'draft-js';

const useDrag = () => {
	const { state: { nodes, newDragFlag, activeDragIndex }, dispatch } = useContext(HomeContext);
	const { updateNode, createNode } = useApi();

	const handleDragStart = (event: DraggableEvent, flag: boolean, item_type: NodeEnum | number) => {
		dispatch({ type: HomeActionEnum.SET_DRAG_FLAG, payload: flag });
		dispatch({ type: HomeActionEnum.SET_DRAG_INDEX, payload: item_type });
	}

	const getNode = (type: NodeEnum, clientX: number, clientY: number): Node => {
		switch (type) {
			case NodeEnum.BOARD:
				return { _id: uuid(), type, x: clientX, y: clientY, name: '' }
			case NodeEnum.NOTE:
				return { _id: uuid(), type, x: clientX, y: clientY, note: EditorState.createEmpty() }
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


	const handleDrop = (clientX: number, clientY: number) => {
		if (newDragFlag) {
			const node: Node = getNode(activeDragIndex as NodeEnum, clientX, clientY);
			console.log(node);
			dispatch({ type: HomeActionEnum.SET_NODE, payload: node });
			// createNode(node, nodes.length);
		} else {
			const index = activeDragIndex as number;
			if (nodes[index].x === clientX && nodes[index].y === clientY) {

			} else {
				const new_node: Node = { ...nodes[index], x: clientX, y: clientY };
				dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
				// updateNode(new_node, index);
			}
		}
	}

	const handleDropBin: DragEventHandler<HTMLLIElement> = (event) => {
		// const index = parseInt(event.dataTransfer.getData('index'));
		console.log(activeDragIndex)
		if (activeDragIndex) {
			dispatch({ type: HomeActionEnum.DEL_NODE, payload: activeDragIndex as number })
		}
	}


	return { handleDragStart, handleDragOver, handleDrop, handleDropBin }
}

export default useDrag;