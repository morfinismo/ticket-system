const { io } = require("../server");

//constant communication with backend
io.on("connection", (client) => {
    console.log("Client connected");

    client.emit("sendMessage", {
        user: "Admin",
        message: "Welcome to this app"
    });

    client.on("disconnect", () => {
        console.log("Client disconnected");
    });

    client.on("sendMessage", (payload, callback) => {

        console.log(payload);
        client.broadcast.emit("sendMessage", payload);

        // if (payload.user) {
        //     callback({
        //         resp: "OK TRUE"
        //     });
        // } else {
        //     callback({
        //         resp: "OK FALSE"
        //     });
        // }
    });
});