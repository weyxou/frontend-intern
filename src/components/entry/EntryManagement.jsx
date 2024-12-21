import React, { useState, useEffect, useContext } from "react";
import styles from "./EntryManagement.module.css";
import { AuthContext } from "../context/AuthContext";

const EntryManagement = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch(
        "https://67659526410f849996558ecf.mockapi.io/users/entries"
      );
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  const handleAddEntry = async () => {
    if (!newTitle || !newDescription || !newImage) {
      alert("Please write title, description, and image.");
      return;
    }

    const isDuplicate = entries.some(
      (entry) => entry.title.toLowerCase() === newTitle.toLowerCase()
    );
  
    if (isDuplicate) {
      alert("Choose another title");
      return;
    }

    const newEntry = {
      title: newTitle,
      description: newDescription,
      image: URL.createObjectURL(newImage),
    };

    try {
      const response = await fetch(
        "https://67659526410f849996558ecf.mockapi.io/users/entries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEntry),
        }
      );

      if (response.ok) {
        fetchEntries();
        setNewTitle("");
        setNewDescription("");
        setNewImage(null);
      } else {
        alert("Failed to add.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `https://67659526410f849996558ecf.mockapi.io/users/entries/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchEntries();
        } else {
          alert("Failed to delete.");
        }
      } catch (error) {
        console.error("Error", error);
      }
    }
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setNewTitle(entryToEdit.title);
    setNewDescription(entryToEdit.description);
    setNewImage(null);
    setIsEditing(true);
    setEditingId(id);
    setEditTitle(false);
    setEditImage(false);
    setEditDescription(false);
  };

  const handleSaveEdit = async () => {
    const updatedEntry = {
      title: editTitle ? newTitle : undefined,
      description: editDescription ? newDescription : undefined,
      image: editImage ? URL.createObjectURL(newImage) : undefined,
    };

    try {
      const response = await fetch(
        `https://67659526410f849996558ecf.mockapi.io/users/entries/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEntry),
        }
      );

      if (response.ok) {
        fetchEntries();
        setNewTitle("");
        setNewDescription("");
        setNewImage(null);
        setIsEditing(false);
        setEditingId(null);
        setEditTitle(false);
        setEditImage(false);
        setEditDescription(false);
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  if (!isAuthenticated) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div className={styles["entry-management"]}>
      <h1>Entry Management</h1>

      <div className={styles["create-entry"]}>
        <input
          type="text"
          placeholder="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
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
                  checked={editDescription}
                  onChange={() => setEditDescription(!editDescription)}
                />
                Edit Description
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
            <img
              src={entry.image}
              alt={entry.title}
              className={styles.thumbnail}
            />
            <div className={styles["entry-details"]}>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
              <button onClick={() => handleEditEntry(entry.id)}>Edit</button>
              <button onClick={() => handleDeleteEntry(entry.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryManagement;
