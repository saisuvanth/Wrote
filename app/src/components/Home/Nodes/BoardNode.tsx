import { Avatar, CardContent, CardMedia, Box } from '@mui/material'
import React, { FC, KeyboardEventHandler, useContext, useEffect, useRef } from 'react'
import useApi from '../../../hooks/useApi';
import { ComponentNode, IBoardNode, Node } from '../../../types';
import { HomeActionEnum } from '../../../utils/constants';
import HomeContext from '../../../utils/contexts/HomeContext';
import styles from './Nodes.module.css';


const BoardNode: FC<ComponentNode> = ({ node, index }: { node: IBoardNode, index: number }) => {
	const { dispatch } = useContext(HomeContext);
	const nameRef = useRef<HTMLInputElement>(null);
	const { updateNode } = useApi();


	useEffect(() => {
		nameRef.current?.focus();
	}, [])

	const handleKey: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === 'Enter') {
			const name = nameRef.current?.value;
			if (name) {
				const new_node: Node = { ...node, name };
				dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
				updateNode(new_node, index);
			} else {
			}
		}
	}

	return (
		<Box className={styles.board_wrapper}>
			<CardMedia className={styles.node_img} component={'div'} children={<Avatar>{node.name ? node.name[0] : ''}</Avatar>} />
			<CardContent sx={{ px: '4px', py: '0px !important', textAlign: 'center' }}>
				{
					node.name ?
						<div className={styles.input}>
							{node.name}
						</div>
						:
						<input
							className={styles.input}
							type="text"
							defaultValue={'New Node'}
							ref={nameRef}
							onKeyDown={handleKey} />
				}
			</CardContent>
		</Box>
	)
}

export default BoardNode