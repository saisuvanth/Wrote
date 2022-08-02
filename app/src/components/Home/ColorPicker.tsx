import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful';
import useClickOutside from '../../hooks/useClickOutside';
import styles from './components.module.css';

const ColorPicker = () => {
	const popover = useRef(null);
	const [open, setOpen] = useState(false);
	const [color, setColor] = useState('gray')

	useClickOutside(popover, useCallback(() => setOpen(false), []));

	return (
		<ListItem sx={{ display: 'block', pb: '5px', pt: 2 }} >

			<ListItemButton className={styles.picker}
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
				<div
					className={styles.swatch}
					style={{ backgroundColor: color }}
					onClick={() => setOpen(true)}
				/>

				{open && (
					<div className={styles.popover} ref={popover}>
						<HexColorPicker color={color} onChange={setColor} />
					</div>
				)}
				<ListItemText primary={'Color'} primaryTypographyProps={{ fontSize: '10px' }} />
			</ListItemButton>
		</ListItem>
	);
}

export default ColorPicker