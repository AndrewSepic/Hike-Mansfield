import { useState, useEffect } from 'react'
import mansfieldTrails from "../trails/mansfield-trail-lines.json"
import Trail from './Trail'


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
		const sunsetRidgeCoords = trailsArray[1].geometry.coordinates
		console.log(sunsetRidgeCoords)
		console.log(trailsArray.length)
		mapRef.current.addSource('sunset-ridge', {
			'type': 'geojson',
			'data': {
				'type': 'Feature',
				'properties': {},
				'geometry': {
					'type': 'LineString',
					'coordinates': sunsetRidgeCoords
				}
			}
		})
		mapRef.current.addLayer({
			'id': 'sunset-ridge',
			'type': 'line',
			'source': 'sunset-ridge',
			'layout': {
				'line-join': 'round',
				'line-cap': 'round'
			},
			'paint': {
				'line-color': '#FFF',
				'line-width': 6
			}
		})
		setTrailsAreLoaded(true)
	}


	return (
		<>
		{(trailsAreLoaded) ? (
			<div className="flex flex-col">
				<h2 className="font-heading w-full border-b-4 border-dark-brown text-dark-brown text-2xl mb-4">Trails</h2>
				{trails.map((trail) => {
					return (
						<Trail trailData={trail}></Trail>
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