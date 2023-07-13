'use client'
import mapboxGl from "mapbox-gl"
import { useEffect, useState } from 'react'
import 'node_modules/mapbox-gl/src/css/mapbox-gl.css'
import Toolbar from "./components/Toolbar"

export default function Home() {

	console.log('app loads')

	const destinationMountain = {
		zoom: 14,
		bearing: 135.2,
		pitch: 75
	}

	const handleMapMove = (coordinates) => {
		
		//console.log("State isn't changed. Does this reload?")
		
		destinationMountain.center = coordinates
		console.log(destinationMountain);
		map.flyTo({
			...destinationMountain, // Fly to the selected target
			duration: 6000, // Animate over 12 seconds
			essential: true // This animation is considered essential with
			//respect to prefers-reduced-motion
		});
	}


	useEffect(() => {

		function rotateCamera(timestamp) {
			// clamp the rotation between 0 -360 degrees
			// Divide timestamp by 100 to slow rotation to ~10 degrees / sec
			map.rotateTo((timestamp / 200) % 360, { duration: 0 });
			// Request the next frame of the animation.
			requestAnimationFrame(rotateCamera);
		}

		mapboxGl.accessToken = 'pk.eyJ1IjoiYW5kcmV3c2VwaWMiLCJhIjoiY2xqdGJldGo0MHJoeTNtbWlnYW92dG85bCJ9.t0xMbigo5pFzlRzCBTsw-A';
		const map = new mapboxGl.Map({
			container: 'map', // container ID
			projection: 'globe',
			style: 'mapbox://styles/andrewsepic/cljtdab1j019v01qu8bxj3db9',
			center: [-72.815438, 44.542950], // starting position [lng, lat]
			pitch: 75,
			bearing: 135.2,
			zoom: 14, // starting zoom
		});

		map.once('idle', () => {
			//rotateCamera(0);
		})
	})
  return (
	<div className="Wrapper flex">
		
		<Toolbar handleMapMove={handleMapMove}></Toolbar>

		<div 
			id="map"
			className="w-3/4 h-screen z-0">
		</div>
	</div>
  )
}
