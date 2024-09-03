const options = {
    method: 'GET',
    headers: {accept: 'application/json', appKey: 'OPMktcSAqfdZXpWCfzR51WKwA6vavkoBAQClZTc0'}
};

fetch('https://apis.openapi.sk.com/tmap/staticMap?version=1&coordType=WGS84GEO&width=512&height=512&zoom=15&format=PNG&longitude=126.83529138565&latitude=37.5446283608815&markers=126.978155%2C37.566371', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));