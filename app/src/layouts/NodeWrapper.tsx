import { Card } from '@mui/material';
import { FC, MouseEventHandler, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardNode from '../components/Home/Nodes/BoardNode';
import LinkNode from '../components/Home/Nodes/LinkNode';
import NoteNode from '../components/Home/Nodes/NoteNode';
import TodoNode from '../components/Home/Nodes/TodoNode';
import useDrag from '../hooks/useDrag';
import useSave from '../hooks/useSave';
import { ComponentNode } from '../types';
import { HomeActionEnum, NodeEnum } from '../utils/constants';
import HomeContext from '../utils/contexts/HomeContext';
import styles from './components.module.css';


const NodeWrapper: FC<ComponentNode> = ({ node, index }) => {
	const { handleSaveNodesLocal } = useSave();
	const { dispatch } = useContext(HomeContext);
	const { handleDragStart } = useDrag();
	const navigate = useNavigate();

	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		const click = event.detail;
		if (click === 1) {
			dispatch({ type: HomeActionEnum.SET_ACTIVE, payload: index });
		} else if (click === 2) {
			if (node.type === NodeEnum.BOARD) {
				handleSaveNodesLocal(node, navigate);
			}
		}
	}

	const getBoard = () => {
		return <BoardNode node={node} index={index} />
	}

	const getNote = () => {
		return <NoteNode node={node} index={index} />;
	}

	const getTodo = () => {
		return <TodoNode node={node} index={index} />;
	}

	const getLink = () => {
		return <LinkNode node={node} index={index} />;
	}

	// const getColumn = () => {

	// }

	const getNode = () => {
		switch (node.type) {
			case NodeEnum.BOARD:
				return getBoard();
			case NodeEnum.NOTE:
				return getNote();
			case NodeEnum.TODO:
				return getTodo();
			case NodeEnum.LINK:
				return getLink();
			default:
				return null;
		}
	}

	return (
		<Card className={styles.node_wrapper} sx={{ left: node.x, top: node.y }} onClick={handleClick} draggable onDragStart={event => handleDragStart(event, 'update', index)}>
			{getNode()}
		</Card>
	)
}

export default NodeWrapper;