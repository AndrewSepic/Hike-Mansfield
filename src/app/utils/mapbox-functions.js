const createTrails = ( arrayOfTrails, mapRef ) => {

	arrayOfTrails.forEach(element => {
		let trailName = element.properties.Name
		trailName = trailName.replace(' ', '-').toLowerCase()
		// console.log(trailName) 
		let coords = element.geometry.coordinates 
		var randomColor = Math.random().toString(16).slice(2, 8).padEnd(6,0)
		// places the random color into the trail element
		element.properties.paint = randomColor
		// console.log(randomColor)

		setTimeout(() => {
			mapRef.current.addSource(trailName, {
				'type': 'geojson',
				'data': {
					'type': 'Feature',
					'properties': {},
					'geometry': {
						'type': 'LineString',
						'coordinates': coords
					}
				}
			})
			mapRef.current.addLayer({
				'id': trailName,
				'type': 'line',
				'source': trailName,
				'layout': {
					'line-join': 'round',
					'line-cap': 'round'
				},
				'paint': {
					'line-color': `#${randomColor}`,
					'line-width': 4
				}
			})
		}, 500)

		
		
	});

	// Return trails array with random colors assigned to each trail. 
	return arrayOfTrails

}

export default createTrails