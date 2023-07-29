const createTrails = ( arrayOfTrails, mapRef ) => {

	//const sunsetRidgeCoords = arrayOfTrails[1].geometry.coordinates
	console.log(arrayOfTrails.length)
	console.log(arrayOfTrails)

	arrayOfTrails.forEach(element => {
		let trailName = element.properties.Name
		trailName = trailName.replace(' ', '-').toLowerCase()
		console.log(trailName) 
		let coords = element.geometry.coordinates 
		var randomColor = (Math.floor(Math.random() * 2 ** 24)).toString(16).padStart(0, 6);
		console.log(randomColor)

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
				'line-width': 6
			}
		})
		
	});

	



}

export default createTrails