const map = L.map('map').setView([35.9, 128], 7);

// OpenStreetMap 타일맵을 추가
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// GeoJSON 시군구 데이터 추가
const geoJsonData = 'korea_sigunguc.geojson'; // GeoJSON 파일 경로

fetch(geoJsonData)
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data).addTo(map);
    });
