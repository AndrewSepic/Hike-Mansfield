const Trail = ({trailData}) => {

	return (
		<div className="p-2 bg-[#d9cfaf] rounded w-full my-2 hover:bg-[#fffcf0] transition-all cursor-pointer">
			<div className="Header w-full flex items-center">
				<span 
				className="swatch h-4 w-4 inline-block border-white border-2 rounded mr-1"
				style={{backgroundColor: '#' + trailData.properties.paint}}></span>
				<h3 className="font-heading text-light-brown text-xl">{trailData.properties.Name}</h3>
			</div>
			<div className="content flex flex-wrap justify-between">
				<span className="p2 w-1/2 text-xs text-dark-brown">Distance: {trailData.properties.DISTANCE} miles</span>
				<span className="p2 w-1/2 text-xs text-dark-brown">Elevation Max: {trailData.properties.ELEVMAX}'</span>
				<span className="p2 w-1/2 text-xs text-dark-brown">Elevation Min: {trailData.properties.ELEVMIN}'</span>
				<span className="p2 w-1/2 text-xs text-dark-brown">Average Grade: {trailData.properties.GRADEAVG}</span>
			</div>
			
		</div>
	)
}

export default Trail