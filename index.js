const express = require('express');
const app = express();
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000
const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.07qeawr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        console.log("finding client...");
        const designCollection = client.db("own_portfolio").collection("design");
        app.get('/design', async (req, res) => {
            const query = {};
            const cursor = designCollection.find(query);
            const services = await cursor.toArray(cursor);
            res.send(services);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Munna's Portfolio!")
});

app.get('/projects', (req, res) => {
    res.send("projects!")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})