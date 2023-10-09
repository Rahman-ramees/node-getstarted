const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://rahmanramees:9207677362rmz@rahman.cbrumpj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const client = new MongoClient(url);
 
 // Reference the database to use
 const dbName = "gettingStarted";
                      
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         const db = client.db(dbName);

         // Reference the "people" collection in the specified database
         const col = db.collection("people");
         

         // Create a new document                                                                                                                                           
         let personDocument = {
             name: { "first": "Alan", "last": "Turing" },
             birth: new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
             death: new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
             contribs: [ "Turing machine", "Turing test", "Turingery" ],
             views: 1250000
         }

         // Insert the document into the specified collection        
         const p = await col.insertOne(personDocument);
       

         // Find and return the document
         const filter = { "name.last": "Turing" };  
         const document = await col.findOne(filter)
         console.log("Document found:\n" + JSON.stringify(document));// Define the filter and update objects

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
