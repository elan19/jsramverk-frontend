beforeCreate() {
    let mapcomp = document.createElement("div");
    mapcomp.id = "map";
    mapcomp.className = "map";
    document.body.appendChild(mapcomp);
},
mounted() {

    let mapcomp = document.getElementById("map");
    const map = L.map(mapcomp).setView([62.173276, 14.942265], 5);

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let socket = io("https://jsramverk-train-elan19.azurewebsites.net");
    if (process.env.NODE_ENV !== "production") {
        socket = io("http://localhost:1337");
    }
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