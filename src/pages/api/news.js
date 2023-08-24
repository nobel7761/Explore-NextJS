const { MongoClient, ServerApiVersion } = require("mongodb");
// import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://news-admin:jsK51ZHm4hFDi9Cw@cluster0.grizk.mongodb.net/news-portal?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    await client.connect();

    const newsCollection = client.db("news-portal").collection("news");

    if (req.method === "GET") {
      const news = await newsCollection.find({}).toArray();
      res.send({ message: "Success", status: 200, data: news });
    }

    if (req.method === "POST") {
      const news = req.body;
      const result = await newsCollection.insertOne(news);

      res.json(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

export default run;
