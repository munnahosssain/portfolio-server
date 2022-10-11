const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors');
// const designRouter = require('./routes/design.route.js');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.07qeawr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// app.use('/design', designRouter);

async function run() {
    try {
        await client.connect();
        const designCollection = client.db("own_portfolio").collection("design");
        const serviceCollection = client.db("own_portfolio").collection("Services");
        const reactCollection = client.db("own_portfolio").collection("ReactJS");
        const vanillaCollection = client.db("own_portfolio").collection("VanilaJs");
        const apisCollection = client.db("own_portfolio").collection("APIs");
        const nativeCollection = client.db("own_portfolio").collection("RN");

        app.get('/design', async (req, res) => {
            const query = {};
            const cursor = designCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        });

        app.get('/Services', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        });

        app.get('/ReactJS', async (req, res) => {
            const query = {};
            const cursor = reactCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        });

        app.get('/VanilaJs', async (req, res) => {
            const query = {};
            const cursor = vanillaCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        });

        app.get('/APIs', async (req, res) => {
            const query = {};
            const cursor = apisCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        });

        app.get('/RN', async (req, res) => {
            const query = {};
            const cursor = nativeCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        });
    }
    finally {

    }
};
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Munna's Portfolio!")
});

app.get('/times', (req, res) => {
    res.send(showTimes())
});

app.get('/projects', (req, res) => {
    res.send("projects!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})