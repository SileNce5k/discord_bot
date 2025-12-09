class Bot {
    static MAX_SIZE = 1024;
    constructor(){ 
                    // Make this stuff a singleton. I think it's as simple as having a static singleton variable, on first construction it should assign "this" to it
                   // On second construction it should just return the singleton if it's not null.
        let logs = db.prepare("SELECT * FROM log ORDER BY timestamp DESC LIMIT ?").all(Bot.MAX_SIZE);
        logs.sort((a, b) => a.timestamp - b.timestamp);
        logs.forEach(log => {
            this.#stdout.push({timestamp: log.timestamp, logEntry: log.entry});
        });
        let errors = db.prepare("SELECT * FROM error ORDER BY timestamp DESC LIMIT ?").all(Bot.MAX_SIZE);
        errors.sort((a, b) => a.timestamp - b.timestamp)
        errors.forEach(error => {
            this.#stderr.push({timestamp: error.timestamp, logEntry: error.entry});
        })
        this.#lastLogInDB = db.prepare(`SELECT timestamp FROM log ORDER BY timestamp DESC LIMIT 1`).get()?.timestamp;
        this.#lastErrorInDB = db.prepare(`SELECT timestamp FROM error ORDER BY timestamp DESC LIMIT 1`).get()?.timestamp;
        if(this.#lastLogInDB === undefined) this.#lastLogInDB = 0;
        if(this.#lastErrorInDB === undefined) this.#lastErrorInDB = 0;
        
        this.#updateDbId = setInterval(this.updateDb.bind(this), this.#dbSyncRate)
        // How often should I actually push to this? I could probably make it faster than every second without many issues.
        // Of course if the discord bot crashes, the database won't contain the latest entries _anyways_
        // I could also make this a configurable setting via the custom command system.
        // The command could be something like "dbupdaterate <num_in_ms>" or "dbsyncrate" ... hmm I think I prefer dbsyncrate.
        // The setInterval Id could be saved in a private property called dbUpdateRate or dbSyncRate. 
        // I guess this means I should have a config table in the database so it persists on reboots.
        // Default can be 1000 because it's a nice round number
        // TODO: Implement this.
    }
    #lastLogInDB = 0;
    #lastErrorInDB = 0;
    #stdout = [];
    #stderr = [];
    #dbSyncRate = 1000;
    #updateDbId = 0;
    updateSyncRate(ms){
        this.#dbSyncRate = ms;
        clearInterval(this.#updateDbId);
        this.#updateDbId = setInterval(this.updateDb.bind(this), this.#dbSyncRate)

    }
    #purgeLogs(output) {
        switch (output) {
            case "stdout": {
                if (this.#stdout.length >= Bot.MAX_SIZE) {
                    this.#stdout.shift();
                    return true;
                }
                break;
            }
            case "stderr": {
                if (this.#stderr.length >= Bot.MAX_SIZE) {
                    this.#stderr.shift();
                    return true;
                }
                break;
            }
            default:
                throw new Error(`Invalid input. Only "stdout" and "stderr" allowed, got ${output}`)
        }
        return false;
    }

    log(...args) {
        this.#purgeLogs("stdout")
        const timestamp = new Date().valueOf();
        this.#stdout.push({ timestamp, logEntry: args.join(" ") })
        process.stdout.write(`${args.join(" ")}\n`)
    }
    error(...args){
        this.#purgeLogs("stderr");
        const timestamp = new Date().valueOf();
        this.#stderr.push({ timestamp, logEntry: args.join(" ") });
        process.stderr.write(`${args.join(" ")}\n`)
    }
    #getLogsAfter(timestamp){
        return this.#stdout.filter((log) => log.timestamp > timestamp);
    }
    #getErrorsAfter(timestamp){
        return this.#stderr.filter((log) => log.timestamp > timestamp);
    }
    getAllAfter(timestamp){
        let allLogs = [];
        allLogs = this.#getLogsAfter(timestamp).concat(this.#getErrorsAfter(timestamp))
        allLogs.sort((a, b) => b.timestamp - a.timestamp);
        return allLogs;
    }
    updateDb(){
        const errors = this.#getErrorsAfter(this.#lastErrorInDB);
        const logs = this.#getLogsAfter(this.#lastLogInDB);
        if(errors.length > 0){
            this.#lastErrorInDB = errors[errors.length - 1].timestamp
            const insert = db.prepare("INSERT INTO error (timestamp, entry) VALUES (@timestamp, @logEntry)");
            const insertMany = db.transaction((ilogs) => {
                for (const log of ilogs) {
                    insert.run(log)
                }
            })
            insertMany(errors)
        }
        if(logs.length > 0){
            this.#lastLogInDB = logs[logs.length - 1].timestamp;
            const insert = db.prepare("INSERT INTO log (timestamp, entry) VALUES (@timestamp, @logEntry)");
            const insertMany = db.transaction((ilogs) =>{
                for (const log of ilogs) {
                    insert.run(log)
                }
            });
            insertMany(logs)
        }
    }
    cancelDbInterval(){
        clearInterval(this.#updateDbId);
    }
    
 
}

module.exports = {
    Bot
}