import { ListItem, IconButton, ListItemButton, ListItemIcon, ListItemText, Checkbox, TextField } from '@mui/material';
import { FC, KeyboardEventHandler, useState, ChangeEvent, useContext } from 'react'
import { ITodoNode, Todo } from '../../types';
import { Delete } from '@mui/icons-material';
import HomeContext from '../../utils/contexts/HomeContext';
import { HomeActionEnum } from '../../utils/constants';

interface ITodo {
	todo: Todo;
	index: number;
	todoIndex?: number;
	node: ITodoNode;
}

const TodoItem: FC<ITodo> = ({ todo, index, todoIndex, node }) => {
	const [checked, setChecked] = useState(todo.completed ? todo.completed : false);
	const [name, setName] = useState<string>(todo.title ? todo.title : '');
	const { dispatch } = useContext(HomeContext);


	const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
		const flag = event.target.checked;
		setChecked(flag);
		const todos = node.todos;
		if (todos && todoIndex) {
			todos[todoIndex].completed = flag;
			const new_node: ITodoNode = { ...node, todos: todos };
			dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
		}
	}

	const handleChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === 'Enter') {
			console.log(name);
			const todos = node.todos;
			if (todos) {
				todos.push({ title: name, completed: false });
				const new_node: ITodoNode = { ...node, todos: todos };
				dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
			}
			setName('');
		}
	}

	const handleDelete = (ind: number) => {
		const todos = node.todos;
		if (todos) {
			const new_node: ITodoNode = { ...node, todos: todos.filter((t, i) => i !== ind) }
			dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
		}
	}

	if (todoIndex !== undefined) {
		return (
			<ListItem
				secondaryAction={
					checked ?
						<IconButton edge="end" aria-label="delete" onClick={event => handleDelete(todoIndex)}>
							<Delete />
						</IconButton> : null
				}
				disablePadding
			>
				<ListItemButton role={undefined} dense disableTouchRipple>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={checked}
							tabIndex={-1}
							disableRipple
							onChange={handleToggle}
						/>
					</ListItemIcon>
					<ListItemText primary={todo.title} />
				</ListItemButton>
			</ListItem>
		)
	}
	else
		return (<ListItem
			disablePadding
		>
			<ListItemButton role={undefined} dense disableTouchRipple>
				<TextField
					sx={{ cursor: 'pointer' }}
					id="filled-textarea"
					placeholder="Start Typing....."
					variant="filled"
					onKeyDown={handleChange}
					autoComplete='off'
					onChange={event => setName(event.currentTarget.value)}
					size='small'
				/>
			</ListItemButton>
		</ListItem>

		)
}

export default TodoItem;