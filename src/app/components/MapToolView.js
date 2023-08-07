import { useState } from "react"
import CopyToClipboardComponent from "./CopyToClipboard"
import { BsCameraFill } from 'react-icons/bs'

const MapToolView = ({long, lat, zoom, pitch, bearing}) => {

	const [ cameraShot, setCameraShot ] = useState()

	function takePhoto() {
		const cameraAngle = {
			center: [ long,  lat],
			zoom: zoom,
			pitch: pitch,
			bearing: bearing
		}
		setCameraShot(JSON.stringify(cameraAngle, null, 2))
	}



	return (
		<div className="absolute z-10 bottom-2 right-2 flex flex-col items-end">
			{ cameraShot && 
				<CopyToClipboardComponent cameraAngle={cameraShot} setCameraShot={setCameraShot}></CopyToClipboardComponent>
			}
			<div 
				className="bg-[#8a8887] rounded w- text-white h-10 py-2 pr-4 pl-3 inline-block w-12 mb-2 cursor-pointer hover:bg-[#797776]"
				onClick={takePhoto}>
				<BsCameraFill className="w-6 h-6"></BsCameraFill>
			</div>
			<div className="bg-[#8a8887] rounded text-white h-10 py-2 pr-4 pl-3">
				Longitude: {long} | Latitude: {lat} | Zoom: {zoom} | Pitch: {pitch} | <span className="w-[134px] inline-block">Bearing: {bearing}</span>
			</div>
		</div>
	)	
}

export default MapToolView