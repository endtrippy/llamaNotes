require("dotenv").config();
const express = require("express");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const app = express();

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
app.get("/notes", (req, res) => {
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

app.post("/notes", (req, res) => {
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
app.put("/notes", (req, res) => {
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

// Set the server to listen on a port
const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});