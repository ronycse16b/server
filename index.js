const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');





// midelware.config
app.use(cors());
app.use(express.json());
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qnzupqp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const gellariesCollection = client.db('Alumni-project-data').collection('galleries');
        const gellaryCollection = client.db('Alumni-project-data').collection('gallery');
     
        



        //  galary Catagory api 
        app.get('/galleries', async (req, res) => {
            const query = {}
            const cursor = gellariesCollection.find(query);
            const galleries = await cursor.toArray();

            res.send(galleries);
        });


        // gallery api 
        app.get('/galleries/:id', async (req, res) => {


            const id = req.params.id;
      
            const query = { gellary_id: id };
            const cursor = gellaryCollection.find(query);
            const gallery = await cursor.toArray();
            res.send(gallery);
        });




    }
    finally {

    }

}

run().catch(err => console.error(err));






app.get('/', (req, res) => {

    res.send('Hi From Alumni server');
})

app.listen(port, () => {

    console.log(`Listening on port ${port}`);
})