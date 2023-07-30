const MapToolView = ({long, lat, zoom, pitch, bearing}) => {

	return (
		<div className="absolute z-10 bottom-2 right-2 bg-[#8a8887] rounded text-white h-10 p-2">
			Longitude: {long} | Latitude: {lat} | Zoom: {zoom} | Pitch: {pitch} | Bearing: {bearing}
		</div>
	)	
}

export default MapToolView