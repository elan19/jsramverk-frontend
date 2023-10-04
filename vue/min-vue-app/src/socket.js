import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    trainData: [],
});

let socket = io("https://jsramverk-train-elan19.azurewebsites.net");
if (process.env.NODE_ENV !== "production") {
    socket = io("http://localhost:1337");
}

socket.on("connection", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

socket.on("message", (data) => {
    //Might need to remove row under
    state.trainData = data
});
