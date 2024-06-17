require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const app = express();
const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

app.use(cors());
app.use(bodyParser.json());

// Configure AWS
AWS.config.update({
  region: process.env.AWS_REGION, // Replace with your AWS region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Replace with your access key id
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your secret access key
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Define a route to retrieve a note
app.get("/api/notes", (req, res) => {
  const params = {
    TableName: "notes",
  };
  dynamoDb.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        error: "Could not retrieve notes",
      });
    } else {
      res.send(data.Items);
    }
  });
});

app.get("/api/llamaNote", async (req, res) => {
  const input = {
    top_p: 0.95,
    prompt: "Please provide a random note.",
    temperature: 1,
    system_prompt:
      "You are to responed with few sentences (200 tokens) and be concise. Your response must be a thought or idea from historical, mythical, or modern figure. Only write from the 1st person perspective of the figure. Always put your note is quotes and sign your name at the end unquoted.",
    length_penalty: 1,
    max_new_tokens: 200,
    stop_sequences: "<|end_of_text|>,<|eot_id|>",
    prompt_template:
      "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 0,
  };
  const output = await replicate.run("meta/meta-llama-3-8b-instruct", {
    input,
  });
  res.json({ content: output.join("") });
});

app.post("/api/notes", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send({
      error: "Title and content are required",
    });
  }

  const params = {
    TableName: "notes",
    Item: {
      noteId: uuid.v4(),
      title,
      content,
      createdAt: new Date().toISOString(),
    },
  };

  dynamoDb.put(params, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        error: "Could not save the note",
      });
    } else {
      res.status(201).send(params.Item);
    }
  });
});

// PUT request to update the content field of a note
app.put("/api/notes", (req, res) => {
  const { noteId, content } = req.body;

  const params = {
    TableName: "notes",
    Key: {
      noteId: noteId,
    },
    UpdateExpression: "set content = :content",
    ExpressionAttributeValues: {
      ":content": content,
    },
    ReturnValues: "UPDATED_NEW",
  };

  dynamoDb.update(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        error: "Could not update note",
      });
    } else {
      res.send({
        message: "Note updated successfully",
        updatedAttributes: data.Attributes,
      });
    }
  });
});

// Start the server in development mode
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
