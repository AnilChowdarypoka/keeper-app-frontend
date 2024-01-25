


import React, { useState } from 'react';
import axios from 'axios';

function CreateNote({ onAdd, userEmail }) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    userEmail: userEmail, // Set userEmail from props
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value,
      userEmail: userEmail, // Ensure userEmail remains set
    }));
  };

  const submitNote = event => {
    event.preventDefault();

    axios.post('http://localhost:8080/api/keepers', note)
      .then(response => response.data)
      .then(data => {
        onAdd(data);
        setNote({
          title: '',
          content: '',
          userEmail: userEmail, // Reset userEmail after adding note
        });
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateNote;
