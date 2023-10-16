<template>
  <div id="map" class="map"></div>
</template>

<script>
import L from 'leaflet';
import { onMounted, watch } from "vue";
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import model from '../models/train.js';

const delayed = await model.getDelayed();

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});
export default {
  name: 'MapComponent',
  props: ['markers'],
  beforeCreate() {
    let map = document.createElement("div");
    map.id = "map";
    document.body.appendChild(map)
  },
  setup(props) {
    onMounted(async () => {
      let mapcomp = document.getElementById("map");
      const map = L.map(mapcomp).setView([62.173276, 14.942265], 5);

      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      let markers = {};
      watch(() => props.markers, (newMarkers) => {
        delayed.every(delay => {
          if (newMarkers.trainnumber === delay.OperationalTrainNumber) {
            if (Object.prototype.hasOwnProperty.call(markers, newMarkers.trainnumber)) {
              let marker = markers[newMarkers.trainnumber]

              marker.setLatLng(newMarkers.position);
              return false
            } else {
              let marker = L.marker(newMarkers.position).bindPopup(newMarkers.trainnumber).addTo(map);

              markers[newMarkers.trainnumber] = marker
              return false
            }
          }
          return true
        });

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
