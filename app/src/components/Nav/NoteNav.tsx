import { Divider, ListItem, ListItemIcon } from '@mui/material'
import React, { Fragment, useContext } from 'react'
import { HomeActionEnum } from '../../utils/constants'
import HomeContext from '../../utils/contexts/HomeContext'
import { NavBackButton } from './styles'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


const NoteNav = () => {
	const { state: { nodes, activeNav }, dispatch } = useContext(HomeContext);


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
		</Fragment>
	)
}

export default NoteNav