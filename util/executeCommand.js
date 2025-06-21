const { execFileSync } = require('child_process');
module.exports = function(command, commandArgs, verbose=false) {
    if (typeof command !== 'string' || !Array.isArray(commandArgs)) return { error: true };
    console.log("Executing:", command, commandArgs.join(" "));
    try {
        const output = execFileSync(command, commandArgs, {encoding: 'utf8'})
        if (output.length !== 0 && verbose)
            console.log(output)
    } catch (error) {
        console.error(`Error executing ${command} command:`, error);
        return { error: true };
    }
    return { error: false };
}