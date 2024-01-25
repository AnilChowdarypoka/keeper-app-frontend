

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateNote from './CreateNote';

function Home() {
  const [notes, setNotes] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setUserEmail(storedEmail);
      fetchNotes(storedEmail);
    }
  }, []);

  const fetchNotes = (email) => {
    fetch(`http://localhost:8080/api/keepers/by-email?email=${email}`)
      .then(response => response.json())
      .then(data => {
        setNotes(data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  };

  const addNote = (newNote) => {
    fetch('http://localhost:8080/api/keepers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(response => response.json())
      .then(data => {
        setNotes(prevNotes => [...prevNotes, data]);
      })
      .catch(error => {
        console.error('Error adding note:', error);
      });
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:8080/api/keepers/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  return (
    <div>
      <Header />
      <CreateNote onAdd={addNote} userEmail={userEmail} />
      {notes.map(note => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          userEmail={note.userEmail}
          onDelete={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default Home;
