const request = require('request')

const forecast = (latitude, longtitude, callback) => {
	const url = 'https://api.darksky.net/forecast/2eb4b1fcfb3f0569da82c80ea5f92c3e/' + latitude + ',' + longtitude

	request({ url:url, json:true}, (error, {body}) => {
		if(error){
			callback('Unable to connect to weather service!', undefined)
		}else if(body.error){
			callback('Unable to find location.', undefined)
		}else{
			callback(undefined, {
				summary: body.currently.summary,
				temperature: body.currently.temperature
				
			})
		}
	})
}

module.exports = forecast