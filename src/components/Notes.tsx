import { useState, useEffect } from "react";
import { Pin, PenLine, Trash, } from 'lucide-react';


interface Note {
  id: number;
  title: string;
  content: string;
  color: string;
  pinned: boolean;
}

const COLORS = ["bg-yellow-500", "bg-green-500", "bg-blue-500", "bg-pink-500"];

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Save to localStorage 
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!title.trim() && !content.trim()) return;
    const newNote: Note = {
      id: Date.now(),
      title: title.trim() || "Untitled",
      content: content.trim(),
      color,
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    setColor(COLORS[0]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title: editTitle, content: editContent }
          : note
      )
    );
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const togglePin = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const filteredNotes = notes
    .filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned === b.pinned) return b.id - a.id; // newest first
      return a.pinned ? -1 : 1; // pinned first
    });

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow flex flex-col">
      

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-3 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      {/* Input area */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />
      <textarea
        placeholder="Write a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white placeholder-gray-400"
        rows={3}
      />

      {/* Color selector */}
      <div className="flex space-x-2 mb-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-6 h-6 rounded-full border-2 ${
              color === c ? "border-white" : "border-transparent"
            } ${c}`}
          />
        ))}
      </div>

      <button
        onClick={addNote}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold mb-4 self-start"
      >
        Add Note
      </button>

      {/* Notes list */}
      <div className="space-y-3 overflow-y-auto max-h-64 pr-2">
        {filteredNotes.length === 0 && (
          <p className="text-gray-400 text-sm">No notes found.</p>
        )}
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`p-3 rounded-lg flex justify-between items-start ${note.color}`}
          >
            {editingId === note.id ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-1 mb-1 rounded bg-gray-200 text-black"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-1 mb-2 rounded bg-gray-200 text-black"
                  rows={2}
                />
                <button
                  onClick={() => saveEdit(note.id)}
                  className="bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-bold mr-2">{note.title}</h3>
                    {note.pinned && <Pin className="w-4 h-4 text-white" />}

                  </div>
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                </div>

                <div className="flex flex-col space-y-1 ml-2">
                <button
                    onClick={() => togglePin(note.id)}
                    className="text-white hover:text-gray-200 mb-2"
                    >
                    <Pin
                        className={`w-5 h-5 ${note.pinned ? "fill-white" : ""}`}
                    />
                    </button>

                    <button
                        onClick={() => startEditing(note)}
                        className="text-white hover:text-gray-200 mb-2"
                        >
                        <PenLine className="w-5 h-5" />
                    </button>

                    <button
                        onClick={() => deleteNote(note.id)}
                        className="text-white hover:text-red-400 mb-2"
                        >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

