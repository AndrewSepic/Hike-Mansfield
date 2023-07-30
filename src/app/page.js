'use client'
import mapboxGl from "mapbox-gl"
import { useEffect, useRef, useState } from 'react'
import 'node_modules/mapbox-gl/src/css/mapbox-gl.css'
import Toolbar from "./components/Toolbar"
import MapToolView from "./components/MapToolView"

export default function Home() {

	const mapContainer = useRef(null)
	const map = useRef(null)
	mapboxGl.accessToken = 'pk.eyJ1IjoiYW5kcmV3c2VwaWMiLCJhIjoiY2xqdGJldGo0MHJoeTNtbWlnYW92dG85bCJ9.t0xMbigo5pFzlRzCBTsw-A';

	const [ long, setLong ] = useState(0)
	const [ lat, setLat ] = useState(0)
	const [ zoom, setZoom ] = useState(15)
	const [ pitch, setPitch ] = useState(75)
	const [ bearing, setBearing ] = useState(135.2)

	const destinationMountain = {
		zoom: 16.07,
		bearing: 99.68,
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
			center: [-72.8179, 44.5337],
			pitch: 80,
			bearing: 124,
			zoom: 14.25, // starting zoom
		});

		map.current.once('idle', () => {
			//rotateCamera(0);
		})

		map.current.on('move', () => {
			setLong(map.current.getCenter().lng.toFixed(4))
			setLat(map.current.getCenter().lat.toFixed(4))
			setZoom(map.current.getZoom().toFixed(2))
			setPitch(map.current.getPitch().toFixed(2))
			setBearing(map.current.getBearing().toFixed(2))
		});
	})
  return (
	<div className="Wrapper flex">
		
		<Toolbar handleMapMove={handleMapMove} mapRef={map}></Toolbar>
		<MapToolView long={long} lat={lat} zoom={zoom} pitch={pitch} bearing={bearing}></MapToolView>

		<div 
			ref={mapContainer}
			className="map-container w-3/4 h-screen z-0">
		</div>
	</div>
  )
}
