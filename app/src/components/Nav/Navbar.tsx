import { useContext, useState } from 'react'
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Box, Menu, Tooltip, MenuItem, Breadcrumbs } from '@mui/material';
import HomeContext from '../../utils/contexts/HomeContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
	const [userDialog, setUserDialog] = useState<any>(null);
	const { state: { breadcrumbs } } = useContext(HomeContext);

	const handleClose = () => {
		setUserDialog(null);
	}

	return (
		<MuiAppBar position="fixed">
			<Toolbar>
				<Box sx={{ display: 'flex', flexGrow: 2, alignItems: 'center' }}>
					<Typography variant="h6" noWrap component="div">
						Mila Note
					</Typography>
					<Box sx={{ ml: 2 }}>
						<Breadcrumbs>
							{
								breadcrumbs.map((crumb, index) =>
									<Link
										key={index}
										style={{
											// underline:"hover",
											display: 'flex',
											alignItems: 'center',
											color: "inherit"
										}}
										to={`/${crumb.path === '/' ? '' : crumb.path}`}>
										{<crumb.icon />}
										{crumb.name}
									</Link>
								)
							}
						</Breadcrumbs>
					</Box>
				</Box>
				<Box sx={{ flexGrow: 0 }}>
					<Tooltip title='Manage Account'>
						<IconButton onClick={(event) => setUserDialog(event.currentTarget)}>
							<Avatar src='data:image/jpeg;base64,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' />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: 5 }}
						id="simple-menu"
						anchorEl={userDialog}
						open={Boolean(userDialog)}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						onClose={handleClose}
						color='black'
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>Logout</MenuItem>
					</Menu>
				</Box>
			</Toolbar>
		</MuiAppBar>
	);
}
