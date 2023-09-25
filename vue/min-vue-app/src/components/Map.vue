<template>
  <div id="map" class="map"></div>
</template>
  
<script>
import L from 'leaflet';
import { io } from "socket.io-client";
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map-comp',
  mounted() {

    // this part resolve an issue where the markers would not appear
    delete Icon.Default.prototype._getIconUrl;

    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    let socket = io("https://jsramverk-train-elan19.azurewebsites.net");
    if (process.env.NODE_ENV !== "production") {
      socket = io("http://localhost:1337");
    }
    // Create a map instance and set its view to a specific location and zoom level
    const map = L.map('map').setView([62.173276, 14.942265], 5);

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let markers = {};

    socket.on("message", (data) => {
      if (Object.prototype.hasOwnProperty.call(markers, data.trainnumber)) {
        let marker = markers[data.trainnumber]

        marker.setLatLng(data.position);
      } else {
        let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);

        markers[data.trainnumber] = marker
      }
    });

  },
};
</script>
  
<style>
/* Add CSS styles for your map container here */
.map {
  height: 100vh;
  width: 60vw;
}
</style>
  