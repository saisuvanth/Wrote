import { ListItemButton } from '@mui/material'
import { styled } from '@mui/material/styles'


export const NavItemButton = styled(ListItemButton)({
	maxHeight: 50,
	py: '0px',
	flexDirection: 'column',
	px: 2.5,
	'&:hover': {
		backgroundColor: 'revert'
	}
})

export const NavBackButton = styled(ListItemButton)({
	minHeight: 20,
	py: '0px',
	flexDirection: 'column',
	px: 2.5,
	'&:hover': {
		backgroundColor: 'revert'
	}
})