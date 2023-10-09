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

        let User1 = [
            {
                name: { "first": "rahman", "last": "ramees" },
                age:21,
                place:'mukkam',
                mobile:9207677362
            },
            {
                name: { "first": "sarbas", "last": "ali" },
                age:22,
                place:'kozhikkode',
                mobile:790678459
            }
        ]

        const K = await coll.insertMany(User1)

        console.log("Inserted documents:", K.insertedCount);

        const filtered = { "name.first":"sarbas"}
        const update = { $set: { "name.last": "favas" } };

        const result = await coll.updateOne(filtered,update)

        console.log("Matched documents:", result.matchedCount);
        console.log("Modified documents:", result.modifiedCount);

        const docs = await coll.findOne(filtered);
        console.log("document found:\n"+ JSON.stringify(docs));

    }catch(err){
        console.log(err.stack);
    }finally{
        await client.close();
    }
}

run().catch(console.dir);