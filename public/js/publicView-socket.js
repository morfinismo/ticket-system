const socket = io();

let lblTicket1 = $("#lblTicket1");
let lblTicket2 = $("#lblTicket2");
let lblTicket3 = $("#lblTicket3");
let lblTicket4 = $("#lblTicket4");

let lblDesk1 = $("#lblDesk1");
let lblDesk2 = $("#lblDesk2");
let lblDesk3 = $("#lblDesk3");
let lblDesk4 = $("#lblDesk4");

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblDesks = [lblDesk1, lblDesk2, lblDesk3, lblDesk4];


socket.on("currentTicket", (response) => {
    htmlUpdate(response.lastFour);
});

socket.on("updateInfo", (response) => {
    var audio = new Audio("audio/new-ticket.mp3");
    audio.play();
    htmlUpdate(response.lastFour);
});

function htmlUpdate(lastFour) {
    for (var i = 0; i < lastFour.length; i++) {
        lblTickets[i].text(`Ticket ${lastFour[i].number}`);
        lblDesks[i].text(`Desk ${lastFour[i].desk}`);
    }
}