const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

//constant communication with backend
io.on("connection", (client) => {

    client.on("nextTicket", (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        console.log("Next ticket: " + nextTicket);
        callback(nextTicket);
    });

    client.emit("currentTicket", {
        currentTicket: ticketControl.getCurrentTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on("takeTicket", (data, callback) => {
        if (!data.desk) {
            return callback({
                err: true,
                msg: "Desk is required"
            });
        }

        let ticketTaken = ticketControl.takeTicket(data.desk);
        callback(ticketTaken);

        client.broadcast.emit("updateInfo", {
            lastFour: ticketControl.getLastFour()
        });
    });

});