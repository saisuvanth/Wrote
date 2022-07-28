import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import Canvas from '../layouts/Canvas'
import LoadingScreen from '../layouts/LoadingScreen';
import Nav from '../layouts/Nav'
import { HomeContextProvider } from '../utils/contexts/HomeContext'

const Home = () => {
	const params = useParams();
	const [loading, setLoading] = useState(true);

	return (
		< HomeContextProvider >
			{
				loading ?
					<LoadingScreen setLoading={setLoading} params={params} />
					:
					<Fragment>

						<Nav />
						<Canvas params={params} />
					</Fragment>
			}
		</HomeContextProvider >

	)
}

export default Home