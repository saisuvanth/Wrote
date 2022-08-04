import React, { MouseEventHandler, useState } from 'react'
import { styled } from '@mui/material/styles';

interface ArrowProps {
	hover: boolean;
}

const ArrowWrapperDiv = styled('div', {
	shouldForwardProp: (prop) => prop !== 'hover',
})<ArrowProps>(({ theme, hover }) => ({
	position: 'absolute',
	top: 0,
	right: 0,
	width: '5px',
	zIndex: 122323,
	height: '5px',
	backgroundColor: 'black',
	borderRadius: '50%',
	transform: 'scale(1)',
	transition: 'transform .2s ease-in',
	'&:hover': {
		top: '-2px',
		right: '-2px',
		backgroundColor: 'green',
		transform: 'scale(2)'
	}
}))


const ArrowWrapper = () => {
	const [hover, setHover] = useState(false);

	const handleMouseOver: MouseEventHandler<HTMLDivElement> = (event) => {
		console.log('hola');
		setHover(true);
		event.stopPropagation();
	}

	return (
		<ArrowWrapperDiv hover={hover} onMouseOver={handleMouseOver}>
		</ArrowWrapperDiv>
	)
}

export default ArrowWrapper