import { Box, TextField } from '@mui/material'
import { KeyboardEventHandler, FC, useContext, useState } from 'react'
import useApi from '../../../hooks/useApi'
import { ComponentNode, INoteNode } from '../../../types'
import { HomeActionEnum } from '../../../utils/constants'
import HomeContext from '../../../utils/contexts/HomeContext'

const NoteNode: FC<ComponentNode> = ({ node, index }: { node: INoteNode, index: number }) => {
	const { dispatch } = useContext(HomeContext)
	const [value, setValue] = useState('');
	const { updateNode } = useApi();

	const handleChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === 'Enter') {
			const new_node: INoteNode = { ...node, note: value };
			dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
			updateNode(new_node, index);
		}
	}

	return (
		<Box>
			<TextField
				sx={{ cursor: 'pointer' }}
				id="filled-textarea"
				placeholder="Start Typing....."
				multiline
				variant="filled"
				onKeyDown={handleChange}
				defaultValue={node.note}
				onChange={(event) => setValue(event.target.value)}
			/>
		</Box>
	)
}

export default NoteNode;