const Note = require("../models/noteModel");
const Replicate = require("replicate");
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.scan().exec();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve notes" });
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  const newNote = new Note({
    title,
    content,
  });

  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Could not save the note" });
  }
};

exports.generateLlamaNote = async (req, res) => {
  try {
    const content = await replicate.run("meta/meta-llama-3-8b-instruct", {
      input: {
        top_p: 0.9,
        prompt: "Please provide a random note.",
        temperature: 0.9,
        system_prompt:
          "Be concise. Your response must be a thought or journal entry from a historical or modern figure. Figures should be random kings, queens, scientists, comedians, philosophers, and actors. Only write from the 1st person perspective of the figure. Always put your note is quotes and sign your name at the end unquoted.",
        length_penalty: 1,
        max_new_tokens: 200,
        stop_sequences: "<|end_of_text|>,<|eot_id|>",
        prompt_template:
          "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        presence_penalty: 0,
      },
    });
    const title = await replicate.run("meta/meta-llama-3-8b-instruct", {
      input: {
        top_p: 0.9,
        prompt: `Please provide a title for ${content}`,
        temperature: 0.9,
        system_prompt:
          "You are to provide a title for the content provided, it must be concise and relative to the content, no quotoations.",
        length_penalty: 1,
        max_new_tokens: 10,
        stop_sequences: "<|end_of_text|>,<|eot_id|>",
        prompt_template:
          "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
        presence_penalty: 0,
      },
    });
    res.json({
      content: content.join(""),
      title: title.join("").replaceAll('"', ""),
    });
  } catch (error) {
    res.status(500).json({ error: "Could not generate note" });
  }
};
