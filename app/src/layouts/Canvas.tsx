import { FC, MouseEventHandler, useContext, useEffect, useRef } from 'react'
import { Params } from 'react-router-dom';
import useDrag from '../hooks/useDrag';
import { HomeActionEnum } from '../utils/constants';
import HomeContext from '../utils/contexts/HomeContext';
import styles from './components.module.css';
import NodeWrapper from './NodeWrapper';
// import HomeIcon from '@mui/icons-material/Home';
import useApi from '../hooks/useApi';


const Canvas: FC<{ params: Readonly<Params> }> = ({ params }) => {
	const { state: { nodes, breadcrumbs }, dispatch } = useContext(HomeContext);
	const { state } = useContext(HomeContext);
	const canvasRef = useRef<HTMLDivElement>(null);
	const { handleDragOver, handleDrop } = useDrag();
	const { getNodes } = useApi();

	useEffect(() => {
		if (state.breadcrumbs.length !== 0 && state.nodes.length !== 0) {
			localStorage.setItem(params.id ? params.id : '/', JSON.stringify({ name: breadcrumbs[breadcrumbs.length - 1].name, nodes: nodes }));
		}
	}, [state])

	const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
		dispatch({ type: HomeActionEnum.SET_ACTIVE, payload: false });
		localStorage.setItem(params.id ? params.id : '/', JSON.stringify({ name: breadcrumbs[breadcrumbs.length - 1].name, nodes: nodes }));
	}

	return (
		<div className={styles.canvas_wrapper} >
			<div className={styles.canvas} ref={canvasRef} onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
				{nodes?.map((node, index) =>
					<NodeWrapper key={index} node={node} index={index} />
				)}
			</div>
		</div>
	)
}

export default Canvas