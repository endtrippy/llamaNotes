const dynamoose = require("dynamoose");
const uuid = require("uuid");

const noteSchema = new dynamoose.Schema({
  noteId: {
    type: String,
    hashKey: true,
    required: true,
    default: () => uuid.v4(),
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: () => new Date().toISOString(),
  },
});

const Note = dynamoose.model("notes", noteSchema);

module.exports = Note;