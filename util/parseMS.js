module.exports = function(milliseconds){
    
    let timeObject = {
        "days": 0,
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
        "milliseconds": 0,
        "microseconds": 0,
        "nanoseconds": 0
    };

    const timeInMS = {
        "seconds"      : 1000,
        "minutes"      : 60000,
        "hours"        : 3600000,
        "days"         : 86400000,
    }

    if(milliseconds >= timeInMS.days){
        timeObject.days = Math.floor(milliseconds / timeInMS.days);
        milliseconds -= Math.floor(timeInMS.days * timeObject.days);
    }
    if(milliseconds >= timeInMS.hours){
        timeObject.hours = Math.floor(milliseconds / timeInMS.hours);
        milliseconds -= Math.floor(timeInMS.hours * timeObject.hours);
    }
    if(milliseconds >= timeInMS.minutes){
        timeObject.minutes = Math.floor(milliseconds / timeInMS.minutes);
        milliseconds -= Math.floor(timeInMS.minutes * timeObject.minutes);
    }
    if(milliseconds >= timeInMS.seconds){
        timeObject.seconds = Math.floor(milliseconds / timeInMS.seconds);
        milliseconds -= Math.floor(timeInMS.seconds * timeObject.seconds);
    }



    timeObject.milliseconds = milliseconds;
    
    
    return timeObject;
}

/*

{
        "days": 0,
        "hours": 0,
        "minutes": 0,
        "seconds": 0,
        "milliseconds": 0,
        "microseconds": 0,
        "nanoseconds": 0
    },

*/