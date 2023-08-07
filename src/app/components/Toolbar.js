import { FaMountain } from 'react-icons/fa'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { useState } from 'react'
import TrailListing from './TrailListing'

const Toolbar = ({handleMapMove, mapRef}) => {

	const [ activePeak, setActivePeak ] = useState(0)
	const [ nextPeak, setNextPeak ] = useState(1)
	
	const updateState = () => {
		activePeak < threePeaks.length - 1 ? setActivePeak(activePeak + 1) : setActivePeak(0)
		nextPeak < threePeaks.length - 1 ? setNextPeak(nextPeak + 1) : setNextPeak(0)
	}
	
	const threePeaks = [
		{
			name: "Mount Mansfield",
			coordinates: [-72.815438, 44.542950],
			description: "Vermont's tallest peak.",
		},
		{
			name: "Camel's Hump",
			coordinates:  [-72.886339, 44.320417],
			description: "Vermont's 3rd Tallest Peak & Most Unusual .",
		},
		{
			name: "Killington Peak",
			coordinates: [-72.820187, 43.604794],
			description: "Vermont's 2nd tallest peak.",
		},
		{
			name: "Mount Ellen",
			coordinates: [-72.928735, 44.159853],
			description: "Tied for Vermont's 3rd Tallest Peak"
		}
	]
	
	return (
		<div className="toolbar flex flex-col justify-between h-screen w-1/4 bg-beige z-50">

			<div className="Banner flex justify-start mt-8 ">
				<div className="relative w-full">
					<h2 className=" text-amber-50 font-heading bg-green-700 py-4 px-8  text-[2rem] flex items-center"><FaMountain className="mr-4"></FaMountain>{threePeaks[activePeak].name}</h2>
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

			<div
				className="toolbar-body p-6 grow flex flex-col overflow-auto">

				<h3 className="font-heading text-lg text-dark-brown w-full">{threePeaks[activePeak].description}</h3>

				<TrailListing activePeak={activePeak} mapRef={mapRef}></TrailListing>

			</div>

			<div className="navBar w-full flex flex-row">
				<button
					className="flex rounded basis-1/2 bg-slate-300 justify-center items-center text-slate-500 py-4 px-4 m-2"
					disabled={activePeak == 0 ? true : false}>
					<BsArrowLeft className="mr-2"></BsArrowLeft>
					Prev Mountain
				</button>

				<button
					className="bg-green-700 text-amber-50 py-3 px-4 m-2 flex rounded basis-1/2 justify-center items-center transition-all hover:bg-[#1f5b35]"
					onClick={() => {
						handleMapMove(threePeaks[nextPeak].coordinates),
						updateState()
					}}>
						{threePeaks[nextPeak].name}
						<BsArrowRight className="ml-2"></BsArrowRight>
				</button>

			</div>
			
		</div>
	)
}

export default Toolbar