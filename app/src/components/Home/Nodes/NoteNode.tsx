import { Box } from '@mui/material'
import { KeyboardEventHandler, FC, useContext, useEffect } from 'react'
import useApi from '../../../hooks/useApi'
import { ComponentNode, INoteNode } from '../../../types'
import { HomeActionEnum } from '../../../utils/constants'
import HomeContext from '../../../utils/contexts/HomeContext'
import { Editor, EditorState } from 'draft-js';

const NoteNode: FC<ComponentNode> = ({ node, index }: { node: INoteNode, index: number }) => {
	const { dispatch } = useContext(HomeContext)
	// const [value, setValue] = useState('');
	const { updateNode } = useApi();
	// const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	useEffect(() => {
		console.log('hello');
	}, [])

	const handleChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === 'Enter') {
			const new_node: INoteNode = { ...node, note: node.note };
			dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
			updateNode(new_node, index);
		}
	}

	return (
		<Box sx={{ width: '200px', height: '55px', p: 2 }}>
			<Editor
				editorState={node?.note as EditorState}
				// placeholder="Start Typing....."
				// onKeyDown={handleChange}
				onChange={(state) => { console.log(state); return dispatch({ type: HomeActionEnum.SET_NOTE, payload: { index, state } }) }}
			/>
		</Box>
	)
}

export default NoteNode;