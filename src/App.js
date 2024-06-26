import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import logo from "./media/coolLlama.webp";
import llamaButton from "./media/llamaButton.png";
import octocat from "./media/octocat.svg";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const URL = process.env.REACT_APP_BASE_URL + "/api/notes";

  const fetchNotes = useCallback(async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setNewNoteTitle("");
        setNewNoteContent("");
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
          fontFamily: '"Dancing Script", cursive',
          fontSize: "3em",
        }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
          fontFamily: '"Dancing Script", cursive',
          fontSize: "3em",
        }}
      >
        Error: {error.message}
      </div>
    );
  }

  const handleNewNote = () => {
    setIsModalOpen(true);
  };

  const handleSaveNote = async (event) => {
    event.preventDefault();
    if (!newNoteTitle || !newNoteContent) {
      alert("Both title and content are required.");
      return;
    }
    const newNote = {
      title: newNoteTitle,
      content: newNoteContent,
    };

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Failed to save note");
      }

      const savedNote = await response.json();
      setNotes([savedNote, ...notes]);
      setIsModalOpen(false);
      setNewNoteTitle("");
      setNewNoteContent("");
    } catch (error) {
      console.error("Error saving note:", error);
      setError(error);
    }
  };

  const handleLlamaNoteClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/llamaNote"
      );
      const data = await response.json();
      setNewNoteTitle(data.title);
      setNewNoteContent(data.content);
      setIsModalOpen(true);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelCLick = () => {
    setIsModalOpen(false);
    setNewNoteTitle("");
    setNewNoteContent("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="LllamaNotes Logo" />
        <p>
          The classic notes app with a llama. You can create a manual note or
          hit the llama button to have Llama-3 generate you a note. &nbsp;
          <span role="img" aria-label="smiling face with smiling eyes">
            😊
          </span>
        </p>
        <button
          className="image-button"
          onClick={() =>
            (window.location.href = "https://github.com/endtrippy/llamaNotes")
          }
        >
          <img src={octocat} alt="Octocat" />
        </button>
        <div className="buttons">
          <button className="button" onClick={handleNewNote}>
            + Note
          </button>
          <button
            label="lamma"
            className="image-button"
            onClick={handleLlamaNoteClick}
          >
            <img src={llamaButton} alt="Llama 3 Note" />
          </button>
        </div>
      </header>
      <main className="App-main">
        {notes.map((note) => (
          <div key={note.noteId} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </main>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>New Note</h2>
            <form onSubmit={handleSaveNote}>
              <input
                type="text"
                placeholder="Title"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Enter your content here..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                rows={10}
                cols={30}
                required
              />
              <div className="buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelCLick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
