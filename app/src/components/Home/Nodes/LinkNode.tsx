import { Box, Stack, TextField, Typography } from '@mui/material'
import { KeyboardEventHandler, FC, useContext, useState } from 'react'
import { ComponentNode, ILinkNode } from '../../../types'
import { HomeActionEnum, NotifEnum } from '../../../utils/constants'
import HomeContext from '../../../utils/contexts/HomeContext'
import NotificationContext from '../../../hooks/useNotification'
import validator from 'validator/index';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import useClipboard from '../../../hooks/useClipboard'
import { ContentCopy } from '@mui/icons-material'
import useApi from '../../../hooks/useApi'

const LinkNode: FC<ComponentNode> = ({ node, index }: { node: ILinkNode, index: number }) => {
	const [link, setLink] = useState(node.link ? node.link : '');
	const { dispatch } = useContext(HomeContext);
	const notify = useContext(NotificationContext);
	const { copied, handleCopy } = useClipboard({ name: link });
	const { updateNode } = useApi();


	const handleChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.key === 'Enter') {
			if (validator.isURL(link)) {
				const new_node: ILinkNode = { ...node, link };
				dispatch({ type: HomeActionEnum.UPDATE_NODE, payload: { new_node, index } });
				updateNode(new_node, index);
			} else {
				notify({ message: 'Invalid URL', type: NotifEnum.ERROR });
			}
		}
	}

	return (
		<Box>
			{
				node.link ?
					<Stack sx={{ p: 2 }}>
						<Typography sx={{ display: 'flex', flexDirection: 'row' }}>
							<LinkIcon sx={{ pr: 1 }} fontSize={'medium'} />
							<a href={link} target='_blank' rel='noreferrer'>{link}</a>
							{
								copied ?
									<ContentCopyTwoToneIcon sx={{ pl: 1, color: 'green' }} fontSize={'medium'} onClick={event => handleCopy()} />
									: <ContentCopy sx={{ pl: 1 }} fontSize={'medium'} onClick={event => handleCopy()} />
							}
						</Typography>
					</Stack>
					:
					<TextField
						sx={{ cursor: 'pointer' }}
						id="filled-textarea"
						placeholder="Start Typing....."
						variant="filled"
						value={link}
						onKeyDown={handleChange}
						onChange={event => setLink(event.currentTarget.value)}
					/>
			}
		</Box>
	)
}

export default LinkNode;