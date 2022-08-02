import React, { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react'
import { Params } from 'react-router-dom';
import useApi from '../hooks/useApi';
import HomeContext from '../utils/contexts/HomeContext';
import loadingScreenImg from '../utils/loading.svg';

interface Props {
	params?: Readonly<Params>;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

const LoadingScreen: FC<Props> = ({ setLoading, params }) => {
	const { state } = useContext(HomeContext);
	const { getNodes } = useApi();

	useEffect(() => {
		const { id } = params ? params : { id: '' };
		console.log(state);
		if (id) {
			getNodes(id).then(res => setLoading(false));
		} else {
			getNodes('/').then(res => setLoading(false));
		}
	}, [params]);



	return (
		<div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f2f3' }}>
			<img src={loadingScreenImg} alt="" />
		</div>
	)
}

export default LoadingScreen