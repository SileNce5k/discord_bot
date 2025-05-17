module.exports = function(targetTime) {
    const countDownDate = new Date(targetTime).getTime();
    const now = new Date().getTime();
  
    const distance = countDownDate - now;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    if (seconds < 0) { // Due to how the math above works, if the input time is in the past, the time will be off by 1.
      days = days + 1;
      hours = hours + 1;
      minutes = minutes + 1;
      seconds = seconds + 1;
    }
    
    const totalInSeconds = (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
    return { days: days, hours: hours, minutes: minutes, seconds: seconds, totalInSeconds: totalInSeconds };
}
