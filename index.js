class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selector = document.querySelector(selector);
    this.daysSpan = this.selector.querySelector(`[data-value="days"]`);
    this.hoursSpan = this.selector.querySelector(`[data-value="hours"]`);
    this.minsSpan = this.selector.querySelector(`[data-value="mins"]`);
    this.secsSpan = this.selector.querySelector(`[data-value="secs"]`);
    this.DELAY = 1000;
    this.intervalId = null;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }
  getTimeComponents(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, mins, secs };
  }
  renderTimer(deltaTime) {
    const { days, hours, mins, secs } = this.getTimeComponents(deltaTime);
    this.daysSpan.textContent = days;
    this.hoursSpan.textContent = hours;
    this.minsSpan.textContent = mins;
    this.secsSpan.textContent = secs;
  }

  start() {
    let intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = this.targetDate - startTime;
      this.renderTimer(deltaTime);
      if (deltaTime < 0) {
        stopInterval(intervalId);
      }
    }, this.DELAY);
  }
}
const backCounter = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("dec 17, 2021"),
});
backCounter.start();
