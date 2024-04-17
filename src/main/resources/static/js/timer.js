"use strict";

export class Timer {

    constructor() {
        this.clearTime = null;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.secs = 0;
        this.mins = 0;
        this.gethours = 0;

        this.fulltime = document.getElementById("fulltime");

        this.btnContinue = document.getElementById("btn-continue");
        this.btnContinue.addEventListener("click", () => {this.continueTime()});

        this.btnPause = document.getElementById("btn-pause");
        this.btnPause.addEventListener("click", () => {this.pauseTime()});
    }


    startWatch() {
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }

        this.mins = this.minutes < 10 ? "0" + this.minutes + " : " : this.minutes + " : ";
        /* check if minutes is equal to 60 and add a +1
          to hours set minutes to 0 */
        if (this.minutes === 60) {
            this.minutes = 0;
            this.hours++;
        }

        this.gethours = this.hours < 10 ? "0" + this.hours + " : " : this.hours + " : ";
        this.secs = this.seconds < 10 ? "0" + this.seconds : this.seconds;

        this.btnContinue.style.display = "none";
        this.writeTime();
        this.seconds++;

        /* call the setTimeout( ) to keep the Count-Up alive ! */
        this.clearTime = setTimeout(() => {
            this.startWatch()
        }, 1000);
    }

    startTime() {
        if (this.seconds === 0 && this.minutes === 0 && this.hours === 0) {
            this.fulltime.style.display = "none";
            this.startWatch();
        }
    }


    stopTime() {

        if (this.seconds !== 0 || this.minutes !== 0 || this.hours !== 0) {

            this.btnContinue.style.display = "inline-block";
            this.fulltime.style.display = "inline-block";
            this.fulltime.style.color = "#ff4500";
            this.fulltime.innerHTML = "Time Recorded is " + this.gethours + this.mins + this.secs;

            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
            this.secs = "0" + this.seconds;
            this.mins = "0" + this.minutes + " : ";
            this.gethours = "0" + this.hours + " : ";

            this.writeTime();
            this.btnPause.style.display = "none";
            clearTimeout(this.clearTime);
        }
    }

    pauseTime() {
        if (this.seconds !== 0 || this.minutes !== 0 || this.hours !== 0) {
            this.writeTime();
            clearTimeout(this.clearTime);
            this.btnContinue.style.display = 'inline-block';
            this.btnPause.style.display = "none";
        }
    }

    continueTime() {
        if (this.seconds !== 0 || this.minutes !== 0 || this.hours !== 0) {
            this.writeTime();
            clearTimeout(this.clearTime);
            this.clearTime = setTimeout(() => {
                this.startWatch()
            }, 1000);
            this.btnContinue.style.display = "none";
            this.btnPause.style.display = "inline-block";

        }
    }

    writeTime() {
        document.getElementById("timer").innerHTML = this.gethours.toString() + this.mins.toString() + this.secs.toString();
    }
}