import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';


const PRIORITY_CHOICES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const STATUS_CHOICES = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

function App() {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "",
    status: "",
  });
  const [editingChore, setEditingChore] = useState(null);
  const [error, setError] = useState(null);
  const [selectedChore, setSelectedChore] = useState(null);

  useEffect(() => {
    fetchChores();
  }, []);

  const fetchChores = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/chores/");
      setChores(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createChore = async () => {
    if (
      !newChore.title ||
      !newChore.description ||
      !newChore.due_date ||
      !newChore.priority ||
      !newChore.status
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/chores/", newChore);
      fetchChores();
      setNewChore({
        title: "",
        description: "",
        due_date: "",
        priority: "",
        status: "",
      });
      setError(null);
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the chore");
    }
  };

  const editChore = (chore) => {
    setEditingChore(chore);
    setError(null);
  };

  const cancelEdit = () => {
    setEditingChore(null);
    setError(null);
  };

 

// ...

const saveChore = async () => {
  if (
    !editingChore.title ||
    !editingChore.description ||
    !editingChore.due_date ||
    !editingChore.priority ||
    !editingChore.status
  ) {
    setError("Please fill in all fields");
    return;
  }

  // Check if any changes were made
  const { id, ...editedChore } = editingChore;

  // Perform the save operation only if there are changes
  if (Object.keys(editedChore).length === 0) {
    setEditingChore(null);
    setError(null);
    return;
  }

  try {
    await axios.put(
      `http://localhost:8000/api/chores/${editingChore.id}/`,
      editedChore
    );
    fetchChores();
    setEditingChore(null);
    setError(null);
  } catch (error) {
    console.error(error);
    setError("An error occurred while saving the edited chore");
  }
};




  const deleteChore = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/chores/${id}`);
      fetchChores();
      setError(null);
    } catch (error) {
      console.error(error);
      setError("An error occurred while deleting the chore");
    }
  };

  const viewChore = (chore) => {
    setSelectedChore(chore);
  };

  const closeView = () => {
    setSelectedChore(null);
  };

  return (
    <div>
      <h1>Chores</h1>
      <div>
        <h2>Create new chore</h2>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newChore.title}
            onChange={(e) =>
              setNewChore({ ...newChore, title: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={newChore.description}
            onChange={(e) =>
              setNewChore({ ...newChore, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label htmlFor="due_date">Due Date:</label>
          <input
            type="date"
            id="due_date"
            value={newChore.due_date}
            onChange={(e) =>
              setNewChore({ ...newChore, due_date: e.target.value })
            }
          />
          <input
            type="time"
            id="due_time"
            value={newChore.due_time}
            onChange={(e) =>
              setNewChore({ ...newChore, due_time: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={newChore.priority}
            onChange={(e) =>
              setNewChore({ ...newChore, priority: e.target.value })
            }
          >
            <option value="">-- Select Priority --</option>
            {PRIORITY_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={newChore.status}
            onChange={(e) =>
              setNewChore({ ...newChore, status: e.target.value })
            }
          >
            <option value="">-- Select Status --</option>
            {STATUS_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
        </div>
        <button onClick={createChore}>Create</button>
        {error && <p>Error: {error}</p>}
      </div>
      <div>
        <h2>Chore List</h2>
        <ul>
          {chores.map((chore) => (
            <li key={chore.id}>
              <strong>{chore.title}</strong>
              <button onClick={() => viewChore(chore)}>View</button>
              <button onClick={() => editChore(chore)}>Edit</button>
              <button onClick={() => deleteChore(chore.id)}>Delete</button>
              {editingChore && editingChore.id === chore.id && (
                <div>
                  <div>
                    <label htmlFor="edit-title">Title:</label>
                    <input
                      type="text"
                      id="edit-title"
                      value={editingChore.title}
                      onChange={(e) =>
                        setEditingChore({
                          ...editingChore,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-description">Description:</label>
                    <textarea
                      id="edit-description"
                      value={editingChore.description}
                      onChange={(e) =>
                        setEditingChore({
                          ...editingChore,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="edit-due_date">Due Date:</label>
                    <input
                      type="date"
                      id="edit-due_date"
                      value={editingChore.due_date}
                      onChange={(e) =>
                        setEditingChore({
                          ...editingChore,
                          due_date: e.target.value,
                        })
                      }
                    />
                    <input
                      type="time"
                      id="edit-due_time"
                      value={editingChore.due_time}
                      onChange={(e) =>
                        setEditingChore({
                          ...editingChore,
                          due_time: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-priority">Priority:</label>
                    <select
                      id="edit-priority"
                      value={editingChore.priority}
                      onChange={(e) =>
                        setEditingChore({
                          ...editingChore,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Select Priority --</option>
                      {PRIORITY_CHOICES.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="edit-status">Status:</label>
                    <select
                      id="edit-status"
                      value={editingChore.status}
                      onChange={(e) =>
                        setEditingChore({
                          ...editingChore,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Select Status --</option>
                      {STATUS_CHOICES.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {choice.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={saveChore}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                  {error && <p>Error: {error}</p>}
                </div>
              )}
              {selectedChore && selectedChore.id === chore.id && (
                <div>
                  <h2>View Chore</h2>
                  <p>
                    <strong>Title:</strong> {selectedChore.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedChore.description}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {selectedChore.due_date}
                  </p>
                  <p>
                    <strong>Priority:</strong> {selectedChore.priority}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedChore.status}
                  </p>
                  <button onClick={closeView}>Close</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
