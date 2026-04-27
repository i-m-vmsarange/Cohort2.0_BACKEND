
// This line indicates we are creating app using express framework.
// App sirf http requests handle karta such as GET,POST
import app from "./src/app.js";
// Express internally http use karta hai
// But socket.io ko directly http server chahiye hota hai
// Isliye hum http server khud se create karte hai
import {createServer} from "http";
// Ye ek WebSocket based library hai jo real time communication ke liye use hoti hai
import {Server} from "socket.io";

// Create httpserver using express app
/**
 * Express app ko hum HTTP server ke andar wrap kar rahe hain.
 * 1. Ab ye server;
 * HTTP requests bhi handle karega express se 
 * Aur WebSocket bhi handle karega (Socket.IO se)
 */



const httpServer = createServer(app);

/**
 * Attach socket.io to http server
 * io = main Socket.IO instance
 * ye poore app me real time communication control karega
 * Why attach to HTTP server?
 * 1. Because WebSockets starts as HTTP request, then upgrade hote hain
 * 2. Isliye same server use karna jaruri hai.
 */

const io = new Server(httpServer,{});

/**
 * Listen for client connections
 * # Jab koi client browser/frontend connect hoga tab ye function chalega
 * # socket = ek specific user ka connection
 * # Har user ke liye alag socket connection create hota hai
 * # Abhi humne sirf connection event handle kiya hai, aage hum messages bhi handle karenge
 */
io.on("connection",(socket)=>{
    console.log("User is connected",socket.id);
    socket.on("message",(msg)=>{
        console.log(`${socket.id}`,msg);
    });
});


httpServer.listen(3000,()=>{
    console.log("Server is running on port no. 3000")
})