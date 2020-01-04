const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Andre Rabakowski'
	})
})


app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is the guide',
		title: 'Help',
		name: 'Andre'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Chibaku'
	})
})

app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'You must provide an address'
		})
	}else{
		geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => { 
			if(error){
				return res.send({ error: error })
			}

			forecast(latitude, longtitude, (error, forecastData) => {
				if(error){
					return res.send({ error: error })
				}

				res.send({
					location,
					forecast: forecastData,
					address: req.query.address
				})
			})
		})
	}

})

app.get('/products', (req, res) => {
	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term'
		})
	}

	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		name: 'Chibaku',
		error: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		name: 'Chibaku',
		error: 'Page not found'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})