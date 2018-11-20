const fs = require("fs");

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require("../data/data.json");

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCounter();
        }

    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.saveData();
        return `Ticket ${this.last}`;
    }

    getCurrentTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFour() {
        return this.lastFour;
    }

    takeTicket(desk) {
        if (!this.tickets.length) {
            return "Hooray! No more tickets.";
        }
        let ticketNum = this.tickets[0].number;
        this.tickets.shift();
        let ticketTaken = new Ticket(ticketNum, desk);
        this.lastFour.unshift(ticketTaken);
        if (this.lastFour.length > 4) {
            this.lastFour.splice(-1, 1);
        }
        console.log("Last Four:");
        console.log(this.lastFour);

        return ticketTaken;
    }

    restartCounter() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];
        this.saveData();
        console.log("The counter has been restarted.")
    }

    saveData() {
        let jData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };
        let JDataStr = JSON.stringify(jData);
        fs.writeFileSync("./server/data/data.json", JDataStr);
    }
}

module.exports = {
    TicketControl
}