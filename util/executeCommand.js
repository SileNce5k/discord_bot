const { execFileSync } = require('child_process');
module.exports = function(command, commandArgs, verbose=false, bot) {
    if (typeof command !== 'string' || !Array.isArray(commandArgs)) return { error: true };
    bot.log("Executing:", command, commandArgs.join(" "));
    let output;
    try {
        output = execFileSync(command, commandArgs, {encoding: 'utf8'})
        if (output.length !== 0 && verbose)
            bot.log(output)
    } catch (error) {
        bot.error(`Error executing ${command} command:`, error);
        return { error: true };
    }
    return { error: false, output};
}