import { Box } from '@mui/material';
import { FC, useContext, useEffect } from 'react'
import { ComponentNode, ITodoNode, Todo } from '../../../types'
import { HomeActionEnum } from '../../../utils/constants';
import HomeContext from '../../../utils/contexts/HomeContext';
import TodoItem from '../Todo';

const TodoNode: FC<ComponentNode> = ({ node, index }: { node: ITodoNode, index: number }) => {
	const { dispatch } = useContext(HomeContext);

	useEffect(() => {
		const new_node: ITodoNode = { ...node, todos: [] };
		dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	return (
		<Box>
			<TodoItem todo={{} as Todo} index={index} node={node} />
			{
				node.todos?.map((todo, ind) =>
					<TodoItem key={ind} todo={todo} index={index} todoIndex={ind} node={node} />
				)
			}
		</Box>
	);
}

export default TodoNode