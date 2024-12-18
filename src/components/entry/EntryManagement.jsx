import React, { useState } from "react";
import styles from "./EntryManagement.module.css";

const EntryManagement = () => {
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState(false);  
  const [editImage, setEditImage] = useState(false);  

  const handleAddEntry = () => {
    if (!newTitle || !newImage) {
      alert("Please provide both title and image.");
      return;
    }
    const newEntry = {
      id: Date.now(),
      title: newTitle,
      image: URL.createObjectURL(newImage),
    };
    setEntries([...entries, newEntry]);
    setNewTitle("");
    setNewImage(null);
  };

  const handleDeleteEntry = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
    if (isConfirmed) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setNewTitle(entryToEdit.title);
    setNewImage(null); 
    setIsEditing(true);
    setEditingId(id);
    setEditTitle(false); 
    setEditImage(false);
  };

  const handleSaveEdit = () => {
    const updatedEntries = entries.map((entry) => {
      if (entry.id === editingId) {
        const updatedEntry = {
          ...entry,
          title: editTitle ? newTitle : entry.title, 
          image: editImage ? URL.createObjectURL(newImage) : entry.image,
        };
        return updatedEntry;
      }
      return entry;
    });

    setEntries(updatedEntries);
    setNewTitle("");
    setNewImage(null);
    setIsEditing(false);
    setEditingId(null);
    setEditTitle(false);
    setEditImage(false);
  };

  return (
    <div className={styles["entry-management"]}>
      <h1>Entry Management</h1>
  
      <div className={styles["create-entry"]}>
        <input
          type="text"
          placeholder="Enter title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
        />
        {isEditing ? (
          <div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={editTitle}
                  onChange={() => setEditTitle(!editTitle)}
                />
                Edit Title
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={editImage}
                  onChange={() => setEditImage(!editImage)}
                />
                Edit Image
              </label>
            </div>
            <button onClick={handleSaveEdit}>Save Changes</button>
          </div>
        ) : (
          <button onClick={handleAddEntry}>Create Entry</button>
        )}
      </div>
  
      <div className={styles.entries}>
        {entries.map((entry) => (
          <div key={entry.id} className={styles.entry}>
            <img src={entry.image} alt={entry.title} className={styles.thumbnail} />
            <div className={styles["entry-details"]}>
              <h3>{entry.title}</h3>
              <button onClick={() => handleEditEntry(entry.id)}>Edit</button>
              <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryManagement;
