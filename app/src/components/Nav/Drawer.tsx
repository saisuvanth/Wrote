import React, { Fragment, useContext } from 'react';
import styles from './components.module.css';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { home } from '../../utils/constants';
import HomeContext from '../../utils/contexts/HomeContext';
import useDrag from '../../hooks/useDrag';
import { Delete } from '@mui/icons-material';
import Draggable from 'react-draggable';

const Drawer = () => {
	const { state: { activeNav } } = useContext(HomeContext);
	const { handleDragStart, handleDragOver, handleDropBin } = useDrag();

	const getNav = () => {
		if (!activeNav) {
			return home.map((item, index) =>
				<Fragment key={index}>
					{index === 4 ? <Divider sx={{ mb: 1 }} /> : null}
					<ListItem sx={{ display: 'block', pb: '5px', pt: 0 }} >
						<ListItemButton
							disableTouchRipple
							sx={{
								minHeight: 48,
								py: '0px',
								flexDirection: 'column',
								px: 2.5,
								'&:hover': {
									backgroundColor: 'revert'
								}
							}}
						>
							<Draggable>
								
							</Draggable>
							<ListItemIcon
								draggable
								onDragStart={event => handleDragStart(event, 'new', item.name)}
								className={styles.drawer_item}
								sx={{
									minWidth: 0,
									justifyContent: 'center',
								}}
							>
								{<item.icon />}
							</ListItemIcon>
							<ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '10px' }} />
						</ListItemButton>
					</ListItem>
				</Fragment>
			)
		}
	}


	return (
		<div className={styles.side_nav}>
			{getNav()}
			<div style={{ position: 'absolute', bottom: '4rem' }}>
				<ListItem
					sx={{ display: 'block', pb: '5px', pt: 0, px: '5px' }}
					onDragOver={handleDragOver}
					onDrop={handleDropBin}
				>
					<ListItemIcon
						sx={{
							minWidth: 0,
							justifyContent: 'center',
						}}
					>
						{<Delete sx={{ fontSize: '3em', color: '#bbbec3' }} />}
					</ListItemIcon>
				</ListItem>
			</div>
		</div>
	)
}


export default Drawer;
