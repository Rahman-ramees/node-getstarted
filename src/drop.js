const {MongoClient} = require("mongodb")

const url = "mongodb+srv://rahmanramees:9207677362rmz@rahman.cbrumpj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const client = new MongoClient(url)

const dbName = "NodeData"

async function run() {
    try
    {
        await client.connect();
        const db = client.db(dbName)

        const coll = db.collection("InsertingData")

       
        // Use an empty filter to match all documents in the collection
        const filter = {};

        const result = await coll.drop(filter);

        console.log(`${result} db successfully dropped`);

        // After dropping the documents, the collection will be empty
        const docs = await coll.find().toArray();
        console.log("Documents found:\n" + JSON.stringify(docs));

    }catch(err){
        console.log(err.stack);
    }finally{
        await client.close();
    }
}

run().catch(console.dir);