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

        const filtered = {"name.first":"rahman"}

        const result = await coll.deleteOne(filtered)

        if(result.deletedCount === 1){
            console.log("Document successfully deleted");
        }else{
            console.log("Document Not Found");
        }
        
    }catch(err){
        console.log(err.stack);
    }finally{
        await client.close();
    }
}

run().catch(console.dir);