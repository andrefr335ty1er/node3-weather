const request = require('request')

const forecast = (latitude, longtitude, callback) => {
	const url = 'https://api.darksky.net/forecast/2eb4b1fcfb3f0569da82c80ea5f92c3e/' + latitude + ',' + longtitude

	request({ url:url, json:true}, (error, {body}) => {
		if(error){
			callback('Unable to connect to weather service!', undefined)
		}else if(body.error){
			callback('Unable to find location.', undefined)
		}else{
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature 
				+ ' degrees out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow
				+ '. There is a ' + body.currently.precipProbability + ' percent of raining.'
			)
		}
	})
}

module.exports = forecast