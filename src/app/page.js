'use client'
import mapboxGl from "mapbox-gl"
import { useEffect, useState } from 'react'
import 'node_modules/mapbox-gl/src/css/mapbox-gl.css'
import { FaMountain } from 'react-icons/fa'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'


export default function Home() {

	const threePeaks = [
		{
			"name": "Mount Mansfield",
			"coordinates": [-72.815438, 44.542950],
			"description": "Vermont's tallest peak.",
		},
		{
			"name": "Camel's Hump",
			"coordinates":  [-72.886339, 44.320417],
			"description": "Vermont's 2nd tallest peak.",
		},
		{
			"name": "Mount Hunger",
			"coordinates": [-72.645089, 44.395528],
			"description": "Vermont's 3rd tallest peak.",
		}
	]

	const [ activePeak, setActivePeak ] = useState(threePeaks[0])
	const [ nextPeak, setNextPeak ] = useState(threePeaks[1])

	const destinationMountain = {
		zoom: 14,
		bearing: 135.2,
		pitch: 75
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
	<>
		<div className="Wrapper flex">
		<div className="toolbar flex flex-col justify-between h-screen w-1/4 bg-beige z-50">

			<div className="Banner flex justify-start mt-16 ">
				<div className="relative w-full">
					<h2 className=" text-amber-50 font-bold bg-green-700 py-6 px-8  text-2xl flex items-center"><FaMountain className="mr-4"></FaMountain>{activePeak.name}</h2>
					<div className="
						absolute top-0 right-[-40px]
						border-l-transparent w-0 h-0 
						border-t-[40px] border-t-green-700
						border-r-[40px] border-r-transparent
						border-b-transparent"></div>
					<div className="
						absolute bottom-0 right-[-40px]
						border-l-transparent w-0 h-0 
						border-b-[40px] border-b-green-700
						border-r-[40px] border-r-transparent"></div>
				</div>
				
			</div>
			<div className="navBar flex">
				<button
				className="flex bg-slate-300 items-center text-slate-500 py-2 px-4"
				disabled="true">
					<BsArrowLeft className="mr-2"></BsArrowLeft>
					Prev Mountain
				</button>

				<button
					className="bg-amber-50 text-green-700 py-6 px-8 flex items-center hover:bg-amber-100 block">
						{nextPeak.name}
						<BsArrowRight className="ml-2"></BsArrowRight>
				</button>

			</div>
			

			{/* <div className="ToolBar flex justify-between absolute bottom-[80px] h-[80px] left-0 w-full p-6 z-50 bg-stone-200">
				
			</div> */}
			</div>


			<div 
				id="map"
				className="w-3/4 h-screen z-0">
			</div>
		</div>
	</>
  )
}
