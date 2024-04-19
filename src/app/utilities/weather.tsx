const myLocation = {
    'long': '48.7519° N', 
    'lat': '122.4787° W',
    'office': 'SEW',
    'gridX': 131,
    'gridY':123,
},

// current weather conditions
GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast



// hourly forecast
GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast/hourly

// alerts
GET https://api.weather.gov/alerts?point={latitude},{longitude}

// forecast for date
GET https://api.weather.gov/gridpoints/{office}/{gridX},{gridY}/forecast?start={YYYY-MM-DD}T00:00:00Z&end={YYYY-MM-DD}T23:59:59Z

// nearby weather stations
GET https://api.weather.gov/points/{latitude},{longitude}/stations
