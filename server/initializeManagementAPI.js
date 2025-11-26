const port = 3001;
const express = require('express');
const app = express();
const update = require('../util/update')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // Do authentication & stuff here
    next();
})

app.post('/api/v1/restart', (_req, res) => {
    res.status(200).send({message: "NOT_IMPLEMENTED"});
})

app.post('/api/v1/update', (_req, res) => {
    // Implement updating, then send the normal discord message but in logs.
    let sendText = update(client)
    res.status(200).send({message: "Updating.", sendText: sendText})
})



app.get('/api/v1/health_check', (_req, res) => {
    const response = {
        uptime: client.uptime / 1000,
        commandsSinceStart: 0 // TODO: Implement command counter.
    }
    res.status(200).send(response)
})

app.get('/api/v1/routes', (req, res) => {
    res.status(200).send(`Routes: ${app}`)
})

app.listen(port, () => {
    console.log(`INFO: started at http://127.0.0.1:${port}`);
})

process.on('SIGINT', () => {
    console.log("Exiting safely...")
    process.exit();
});
