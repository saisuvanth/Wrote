import { Box, CssBaseline } from '@mui/material'
import Drawer from '../components/Nav/Drawer';
import Navbar from '../components/Nav/Navbar';

const Nav = () => {

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Navbar />
			<Drawer />
		</Box>
	)
}

export default Nav