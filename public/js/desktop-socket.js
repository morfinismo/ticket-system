const socket = io();

let params = new URLSearchParams(window.location.search);
if (!params.has("desk")) {
    window.location = "index.html";
    throw Error("Desk is required!");
}
let ticketLabel = $("small");

let desk = params.get("desk");
$("h1").text(`Desk ${desk}`);

$("button").click(() => {
    socket.emit("takeTicket", {
        desk
    }, (response) => {
        if (response === "Hooray! No more tickets.") {
            ticketLabel.text(response);
            return;
        }
        ticketLabel.text(`: Ticket ${response.number}`);
    });
});