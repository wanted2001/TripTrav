// const map = L.map('map').setView([35.9, 128], 7);
//
// // OpenStreetMap 타일맵을 추가
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 18,
// }).addTo(map);
//
// // GeoJSON 시군구 데이터 추가
// const geoJsonData = '../dist/json/sig.json'; // GeoJSON 파일 경로
//
// fetch(geoJsonData)
//     .then(response => response.json())
//     .then(data => {
//         L.geoJSON(data, {
//             style: function () {
//                 return {
//                     color: '#000000',  // 경계선 색상 (검정)
//                     weight: 2,         // 경계선 두께
//                     fillColor: '#FFFFFF', // 채우기 색상 (하얀색)
//                     fillOpacity: 1      // 채우기 불투명도 (1로 설정하여 완전히 채움)
//                 };
//             }
//         }).addTo(map);
//     });

let element = document.getElementById("yourElementId");

if (element && element.id.includes("pl")) {
    console.log(element.id);
} else {
    console.log("This element's id does not contain 'pl'");
}