const express = require("express");
const redis = require("redis");
const proccess = require("process")

const app = express();
const client = redis.createClient({
    host: 'redis-server',  //El nombre del contenedor en el docker compose, que corre el server redis
    port: 6379   //puerto por defecto es ese
 });
client.set("visits", 0 )

app.get("/", (req, res) => {
    process.exit(0);
    client.get('visits', (err, visits) => {
        res.send("number of visits is " + visits);
        client.set("visits", parseInt(visits) + 1 )

    });

});

app.listen(8081, () => {
    console.log("listening en posrt 8081")
})