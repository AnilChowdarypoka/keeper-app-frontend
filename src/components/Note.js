


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Note(props) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
    userEmail: props.userEmail,
  });

  useEffect(() => {
    setUpdatedNote({
      id: props.id,
      title: props.title,
      content: props.content,
      userEmail: props.userEmail,
    });
  }, [props]);
  const handleUpdate = () => {
    window.location.reload()
    fetch(`http://localhost:8080/api/keepers/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNote),
    })
      .then(response => response.json())
      .then(data => {
        props.onUpdate(data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating note:', error);
      });
  };


  const handleDelete = () => {
    fetch(`http://localhost:8080/api/keepers/${props.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        props.onDelete(props.id);
        navigate('/');
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };


  const handleInputChange = event => {
    const { name, value } = event.target;
    setUpdatedNote(prevNote => ({
      ...prevNote,
      [name]: value,
    }));
  };
  return (
    
    <div className="note">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={updatedNote.title}
            onChange={handleInputChange}
          />
          <textarea
            name="content"
            value={updatedNote.content}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Note;

