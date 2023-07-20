'use client'
import mapboxGl from "mapbox-gl"
import { useEffect, useRef } from 'react'
import 'node_modules/mapbox-gl/src/css/mapbox-gl.css'
import Toolbar from "./components/Toolbar"
import mansfieldTrails from "./trails/mansfield-trail-lines.json"

export default function Home() {

	const mapContainer = useRef(null)
	const map = useRef(null)
	mapboxGl.accessToken = 'pk.eyJ1IjoiYW5kcmV3c2VwaWMiLCJhIjoiY2xqdGJldGo0MHJoeTNtbWlnYW92dG85bCJ9.t0xMbigo5pFzlRzCBTsw-A';

	const destinationMountain = {
		zoom: 15,
		bearing: 135.2,
		pitch: 75
	}

	const handleMapMove = (coordinates) => {
		destinationMountain.center = coordinates
		console.log(destinationMountain);
		map.current.stop() // Doesn't stop the rotate
		map.current.flyTo({
			...destinationMountain, // Fly to the selected target
			duration: 8000, // Animate over 12 seconds
			essential: true // This animation is considered essential with
			//respect to prefers-reduced-motion
		});
	}

	const handleLoadTrails = (activePeak) => {
		const trails = mansfieldTrails
		const sunsetRidgeCoords = trails.features[1].geometry.coordinates
		console.log("sunset Ridge coordinates", sunsetRidgeCoords )
		map.current.addSource('sunset-ridge', {
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
		map.current.addLayer({
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
	}

	function rotateCamera(timestamp) {
		// clamp the rotation between 0 -360 degrees
		// Divide timestamp by 100 to slow rotation to ~10 degrees / sec
		map.current.rotateTo((timestamp / 200) % 360, { duration: 0 });
		// Request the next frame of the animation.
		requestAnimationFrame(rotateCamera);
	}


	useEffect(() => {
		if(map.current) return; // initialize map only once
		map.current = new mapboxGl.Map({
			container: mapContainer.current, // useRef
			projection: 'globe',
			style: 'mapbox://styles/andrewsepic/cljtdab1j019v01qu8bxj3db9',
			center: [-72.815438, 44.542950],
			pitch: 75,
			bearing: 135.2,
			zoom: 15, // starting zoom
		});

		map.current.once('idle', () => {
			//rotateCamera(0);
		})
	})
  return (
	<div className="Wrapper flex">
		
		<Toolbar handleMapMove={handleMapMove} handleLoadTrails={handleLoadTrails}></Toolbar>

		<div 
			ref={mapContainer}
			className="map-container w-3/4 h-screen z-0">
		</div>
	</div>
  )
}
