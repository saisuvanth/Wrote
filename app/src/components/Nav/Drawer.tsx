import { Fragment, useContext } from 'react';
import styles from './components.module.css';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { home, HomeActionEnum, NodeEnum, noteNav } from '../../utils/constants';
import HomeContext from '../../utils/contexts/HomeContext';
import useDrag from '../../hooks/useDrag';
import { Delete } from '@mui/icons-material';
import ColorPicker from '../Home/ColorPicker';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavBackButton, NavItemButton } from './styles';
import NoteNav from './NoteNav';

const Drawer = () => {
	const { state: { nodes, activeNav }, dispatch } = useContext(HomeContext);
	const { handleDragStart, handleDragOver, handleDropBin } = useDrag();

	// const getNoteNav = () => {
	// 	return (
	// 		<Fragment>
	// 			<ListItem sx={{ display: 'block', pb: '0px', pt: 0 }}>
	// 				<NavBackButton disableTouchRipple
	// 					onClick={() => dispatch({ type: HomeActionEnum.SET_ACTIVE, payload: false })}>
	// 					<ListItemIcon
	// 						sx={{
	// 							minWidth: 0,
	// 							justifyContent: 'center',
	// 						}}>
	// 						{<KeyboardBackspaceIcon />}
	// 					</ListItemIcon>
	// 				</NavBackButton>
	// 			</ListItem>
	// 			<Divider />
	// 			{noteNav.map(item => (
	// 				<ListItem sx={{ display: 'block', pb: 0, pt: 0 }}>
	// 					<NavItemButton disableTouchRipple>
	// 						<ListItemIcon
	// 							sx={{
	// 								minWidth: 0,
	// 								justifyContent: 'center',
	// 							}}>
	// 							{<item.icon />}
	// 						</ListItemIcon>
	// 					</NavItemButton>
	// 				</ListItem>
	// 			))}
	// 		</Fragment>
	// 	)
	// }

	const getBoardNav = () => {
		return <Fragment>
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
			<ColorPicker />
		</Fragment>
	}

	const getDefaultNav = () => {
		if (!activeNav) {
			return home.map((item, index) =>
				<Fragment key={index}>
					{index === 4 ? <Divider sx={{ mb: 1 }} /> : null}
					<ListItem sx={{ display: 'block', pb: '5px', pt: 0 }} >
						<NavItemButton disableTouchRipple>
							<ListItemIcon draggable onDragStart={event => handleDragStart(event, true, item.name)}
								className={styles.drawer_item}
								sx={{
									minWidth: 0,
									justifyContent: 'center',
								}}
							>
								{<item.icon />}
							</ListItemIcon>
							<ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '10px' }} />
						</NavItemButton>

					</ListItem>
				</Fragment >
			)
		}
	}
	const getNav = () => {
		if (!activeNav)
			return getDefaultNav();
		switch (nodes[activeNav as number].type) {
			case NodeEnum.BOARD:
				return getBoardNav();
			case NodeEnum.NOTE:
				return <NoteNav />;
		}
	}

	const getTransform = () => {
		if (activeNav)
			return 'translate3d(80px,0px,0px,0px);';
		else return 'translate3d(0px,0px,0px,0px);'
	}

	return (
		<div className={styles.side_nav} style={{ transform: getTransform() }}>
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
