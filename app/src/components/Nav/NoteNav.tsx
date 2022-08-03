import { Divider, ListItem, ListItemIcon } from '@mui/material'
import React, { Fragment, useContext } from 'react'
import { HomeActionEnum, noteNav } from '../../utils/constants'
import HomeContext from '../../utils/contexts/HomeContext'
import { NavBackButton, NavItemButton } from './styles'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useDraftNote from '../../hooks/useDraftNote'


const NoteNav = () => {
	const { state: { nodes, activeNav }, dispatch } = useContext(HomeContext);
	const { handleBoldToggle, handleItalicToggle, handleStrikeToggle, handleUnderlineToggle } = useDraftNote();

	const arr = [handleBoldToggle, handleItalicToggle, handleStrikeToggle, handleUnderlineToggle]
	return (
		<Fragment>
			<ListItem sx={{ display: 'block', pb: '0px', pt: 0 }}>
				<NavBackButton disableTouchRipple
					onClick={() => dispatch({ type: HomeActionEnum.SET_ACTIVE, payload: false })}>
					<ListItemIcon
						sx={{
							minWidth: 0,
							justifyContent: 'center',
						}}>
						{<KeyboardBackspaceIcon />}
					</ListItemIcon>
				</NavBackButton>
			</ListItem>
			<Divider />
			{noteNav.map((item, index) => (
				<ListItem sx={{ display: 'block', pb: 0, pt: 0 }} key={index}>
					<NavItemButton disableTouchRipple onMouseDown={arr[index]}>
						<ListItemIcon
							sx={{
								minWidth: 0,
								justifyContent: 'center',
							}}>
							{<item.icon />}
						</ListItemIcon>
					</NavItemButton>
				</ListItem>
			))}
		</Fragment>
	)
}

export default NoteNav