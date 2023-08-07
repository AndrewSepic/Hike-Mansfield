import { useState, useEffect } from 'react'
import mansfieldTrails from "../trails/mansfield-trail-lines.json"
import Trail from './Trail'
import createTrails from '../utils/mapbox-functions'
import mapboxGl from "mapbox-gl"


const TrailListing = ({activePeak, mapRef }) => {
	console.log("trailsLIsting loads")

	const [ trailsAreLoaded, setTrailsAreLoaded ] = useState(false)
	const [ trails, setTrails ] = useState(false)
	const [ animationComplete, setAnimationComplete ] = useState(false)
	const [ activeTrail, setActiveTrail ] = useState(null)
	const [ trailMarkers, setTrailMarkers ] = useState([])

	useEffect(()=> {
		setTrailsAreLoaded(false)
	}, [activePeak])

	useEffect(() => {
		// var trailStart = null
		// var trailEnd = null
		var counter = 0
	}, [])

	function animateIn() {
		setTimeout(() => {
			setAnimationComplete(true)
		}, 100)
	}

	function loadTrails() {
		let trailsArray = {}
		if(activePeak == 0) {
			trailsArray = mansfieldTrails.features
		}
		// Mapbox magic happens here - Creates trails & returns array of trails with generated colors
		const trailData = createTrails(trailsArray, mapRef)
		setTrails(trailData)
		setTrailsAreLoaded(true)
		animateIn()
	}

	function flyToTrail(trailData) {
	
		if(trailMarkers.length > 0 ) {
			console.log("trail marker remove is happening")
			trailMarkers.forEach((marker) => {
				marker.remove()
			})
		}
		// set State
		setActiveTrail(trailData.properties.Name)
		const cameraView = trailData.cameraView
		const start = trailData.geometry.coordinates[0]
		const length = trailData.geometry.coordinates.length
		const end = trailData.geometry.coordinates[length - 1]

		if(cameraView == null || undefined) {
			console.log("no camera view is set")
			let centerOfTrail = trailData.geometry.coordinates[Math.round(length / 2)]
			mapRef.current.flyTo({
				center: centerOfTrail,
				duration: 4000,
				essential: true,
			})
		} else {
			mapRef.current.flyTo({
				...cameraView,
				duration: 4000,
				essential: true,
			})
		}

		
		// const trailId = trailData.properties.Name.replace(' ', '-').toLowerCase()

		// mapRef.current.addLayer({
		// 	'id': trailId +'Active',
		// 	'type': 'line',
		// 	'source': trailId,
		// 	'layout': {
		// 		'line-join': 'round',
		// 		'line-cap': 'round'
		// 	},
		// 	'paint': {
		// 		'line-color': '#FFFFFF',
		// 		'line-width': 6
		// 	}

		// }, trailId )

		const popupStart = new mapboxGl.Popup({ closeButton: false });
		const popupEnd = new mapboxGl.Popup({ closeButton: false });

		const trailStart = new mapboxGl.Marker({
				color: 'red',
				scale: 0.8,
				draggable: false,
				pitchAlignment: 'auto',
				rotationAlignment: 'auto'
			})
			.setLngLat(start)
			.setPopup(popupStart)
			.addTo(mapRef.current)
			.togglePopup();
			
			const elevationStart = Math.floor(mapRef.current.queryTerrainElevation(start)); 
			// Update the popup altitude value and marker location - elevation returned in meters
			popupStart.setHTML('Altitude: ' + (elevationStart * 3.28084).toFixed(0) + ' ft<br/>');

			const elevationEnd = Math.floor(mapRef.current.queryTerrainElevation(end)); 
			// Update the popup altitude value and marker location - elevation returned in meters, so multiplyby 3.28..
			popupEnd.setHTML('Altitude: ' + (elevationEnd * 3.28084).toFixed(0) + ' ft<br/>');
		
		const trailEnd = new mapboxGl.Marker({
				color: 'red',
				scale: 0.8,
				draggable: false,
				pitchAlignment: 'auto',
				rotationAlignment: 'auto'
			})
			.setLngLat(end)
			.setPopup(popupEnd)
			.addTo(mapRef.current)
			.togglePopup();

		const tempArray = [trailStart, trailEnd]
		setTrailMarkers(tempArray)
	}


	return (
		<>
		{(trailsAreLoaded) ? (
			
			<div className={`flex flex-col transition-all ease-in-out duration-500 ${animationComplete ? "animate-finished" : "animate-wait"}`}>
				<h2 className="font-heading w-full border-b-4 border-dark-brown text-dark-brown text-2xl mb-4">Trails</h2>
					{trails.map((trail, index) => {
						return (
							<Trail 
								key={index} 
								trailData={trail}
								handleClick={flyToTrail}
								active={activeTrail}>
							</Trail>
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