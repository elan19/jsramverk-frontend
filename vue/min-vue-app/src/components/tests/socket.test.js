import { expect, test } from 'vitest'
import { io } from "socket.io-client";

test("testing socket contains data", async () => {
    const socketDataPromise = new Promise((resolve) => {
        const socket = io('https://jsramverk-train-elan19.azurewebsites.net');

        // Listen for the 'message' event
        socket.on('message', (data) => {
            // Resolve the promise with the received data
            resolve(data);
            // Close the socket connection when done
            socket.close();
        });
    });

    // Wait for the promise to resolve, which indicates that data was received
    const data = await socketDataPromise;

    // Perform your assertions on the received data
    // For example, checking if data contains specific keys
    expect(data).hasOwnProperty('trainnumber');
    expect(data).hasOwnProperty('position');
    expect(data).hasOwnProperty('timestamp');
    expect(data).hasOwnProperty('bearing');
    expect(data).hasOwnProperty('status');
    expect(data).hasOwnProperty('speed');
}, 6000);