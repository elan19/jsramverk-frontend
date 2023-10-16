// import { afterAll, afterEach, beforeAll } from 'vitest'
// import { setupServer } from 'msw/node'
// import { rest } from 'msw'

// const delayedData = [
//     {
//         ActivityId: "99b4c82e-5632-991d-2661-0a80783634fb",
//         ActivityType: "Avgang",
//         AdvertisedTimeAtLocation: "2023-10-16T10:37:00.000+02:00",
//         Canceled: false,
//         EstimatedTimeAtLocation: "2023-10-16T10:51:29.000+02:00",
//         LocationSignature: "Lsl",
//         OperationalTrainNumber: "42500",
//         TimeAtLocation: "2023-10-16T09:04:00.000+02:00",
//         TrainOwner: "RRS"
//     },
//     // ...
// ]

// export const restHandlers = [
//     rest.get('http://localhost:1337/delayed', (req, res, ctx) => {
//         return res(ctx.status(200), ctx.json(delayedData))
//     }),
// ]

// const server = setupServer(...restHandlers)

// // Start server before all tests
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// //  Close server after all tests
// afterAll(() => server.close())

// // Reset handlers after each test `important for test isolation`
// afterEach(() => server.resetHandlers())