<template>
  <div id="map" class="map"></div>
</template>

<script>
import L from 'leaflet';
import { onMounted, watch } from "vue";
import 'leaflet/dist/leaflet.css'

export default {
  name: 'MapComponent',
  props: ['markers'],
  setup(props) {

    onMounted(() => {
      let mapcomp = document.getElementById("map");
      const map = L.map(mapcomp).setView([62.173276, 14.942265], 5);

      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      let markers = {};
      watch(() => props.markers, (newMarkers) => {

        if (Object.prototype.hasOwnProperty.call(markers, newMarkers.trainnumber)) {
          let marker = markers[newMarkers.trainnumber]

          marker.setLatLng(newMarkers.position);
        } else {
          let marker = L.marker(newMarkers.position).bindPopup(newMarkers.trainnumber).addTo(map);

          markers[newMarkers.trainnumber] = marker
        }

        return {
          map,
        };
      });
    });

  },
}
</script>

<style>
.map {
  height: 100vh;
  width: 60vw;
}
</style>
