import { Box, CssBaseline } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import Drawer from '../components/Nav/Drawer';
import Navbar from '../components/Nav/Navbar';
import Canvas from '../layouts/Canvas'
import LoadingScreen from '../layouts/LoadingScreen';
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
						<Box sx={{ display: 'flex' }}>
							<CssBaseline />
							<Navbar />
						</Box>
						<Drawer />
						<Canvas params={params} />
					</Fragment>
			}
		</HomeContextProvider >

	)
}

export default Home