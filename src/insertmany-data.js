const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://rahmanramees:9207677362rmz@rahman.cbrumpj.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
const client = new MongoClient(url);
 
 // Reference the database to use
 const dbName = "NodeData";
                      
 async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         const db = client.db(dbName);

         // Reference the "people" collection in the specified database
         const col = db.collection("InsertingData");
         

         // Create a new document                                                                                                                                           
         let personDocument =[
            {
                name: { "first": "rahman", "last": "ramees" },
                birth: new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
                death: new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
                contribs: [ "Turing machine", "Turing test", "Turingery" ],
                views: 1250000
            }, {
                name: { "first": "sayanth", "last": "kumar" },
                birth: new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
                death: new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
                contribs: [ "Turing machine", "Turing test", "Turingery" ],
                views: 1250000
            }, {
                name: { "first": "sarbas", "last": "ali" },
                birth: new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
                death: new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
                contribs: [ "Turing machine", "Turing test", "Turingery" ],
                views: 1250000
            }
         ]

         // Insert the documents into the specified collection        
         const p = await col.insertMany(personDocument);
       

         // Find and return the document
         const filter = { "name.last": "rahman" };  
         const document = await col.find(filter).toArray()
         console.log("Document found:\n" + JSON.stringify(document));// Define the filter and update objects

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);
