import { useState, useEffect, useRef } from 'react'
import mansfieldTrails from "../trails/mansfield-trail-lines.json"
import Trail from './Trail'
import createTrails from '../utils/mapbox-functions'
import { CSSTransition } from "react-transition-group"


const TrailListing = ({activePeak, mapRef }) => {

	const [ trailsAreLoaded, setTrailsAreLoaded ] = useState(false)
	const [ trails, setTrails ] = useState(false)
	const [ animationComplete, setAnimationComplete ] = useState(false)
	const nodeRef = useRef(null)

	useEffect(()=> {
		setTrailsAreLoaded(false)
	}, [activePeak])

	function animateIn() {
		console.log("animation starts")
		setTimeout(() => {
			setAnimationComplete(true),
			console.log("animation is finished")
		}, 0)
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


	return (
		<>
		{(trailsAreLoaded) ? (
			
			<div className={`flex flex-col transition-all ease-in-out duration-500 ${animationComplete ? "animate-finished" : "animate-wait"}`}>
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