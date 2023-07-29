import { useState, useEffect } from 'react'
import mansfieldTrails from "../trails/mansfield-trail-lines.json"
import Trail from './Trail'
import createTrails from '../utils/mapbox-functions'


const TrailListing = ({activePeak, mapRef }) => {

	const [ trailsAreLoaded, setTrailsAreLoaded ] = useState(false)
	const [ trails, setTrails ] = useState(false)

	useEffect(()=> {
		setTrailsAreLoaded(false)
	}, [activePeak])


	function loadTrails() {
		let trailsArray = {}
		if(activePeak == 0) {
			trailsArray = mansfieldTrails.features
			setTrails(mansfieldTrails.features)
		}

		// Mapbox magic happens here
		createTrails(trailsArray, mapRef)
	
		setTrailsAreLoaded(true)
	}


	return (
		<>
		{(trailsAreLoaded) ? (
			<div className="flex flex-col">
				<h2 className="font-heading w-full border-b-4 border-dark-brown text-dark-brown text-2xl mb-4">Trails</h2>
				{trails.map((trail, index) => {
					return (
						<Trail key={index} trailData={trail}></Trail>
					)
				})}
			</div>
		) : (
			<button
			className="bg-light-brown text-light-brown-text py-3 px-4 m-2 flex rounded justify-center items-center transition-all hover:bg-dark-brown"
			onClick={loadTrails}
			>Load Trails...</button>
		)}
			
		
		</>
	)
		
	

}

export default TrailListing