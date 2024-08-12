import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
const backend_url = "http://localhost:8000"

const AdminDashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [form, setForm] = useState({ question: '', answer: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        // Fetch flashcards from the backend
        axios.get(`${backend_url}/flashcards`)
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            // Update flashcard in the database
            axios.put(`${backend_url}/flashcards/${editingId}`, form)
                .then(response => {
                    setFlashcards(flashcards.map(card => (card.id === editingId ? response.data : card)));
                    setEditingId(null);
                })
                .catch(error => console.error('Error updating flashcard:', error));
        } else {
            // Add flashcard to the database
            axios.post(`$[backend_url}/flashcards`, form)
                .then(response => setFlashcards([...flashcards, response.data]))
                .catch(error => console.error('Error adding flashcard:', error));
        }
        setForm({ question: '', answer: '' });
    };

    const handleDelete = (id) => {
        // Delete flashcard from the database
        axios.delete(`${backend_url}/flashcards/${id}`)
            .then(() => setFlashcards(flashcards.filter(card => card.id !== id)))
            .catch(error => console.error('Error deleting flashcard:', error));
    };

    const handleEdit = (card) => {
        setForm({ question: card.question, answer: card.answer });
        setEditingId(card.id);
    };

    return (
        <div style={styles.container}>
            <Header />
            <h1 style={styles.heading}>Admin Dashboard</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Question"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Answer"
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    {editingId ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </form>
            <ul style={styles.list}>
                {flashcards.map(card => (
                    <li key={card.id} style={styles.listItem}>
                        <span>{card.question} - {card.answer}</span>
                        <div>
                            <button onClick={() => handleEdit(card)} style={styles.editButton}>Edit</button>
                            <button onClick={() => handleDelete(card.id)} style={styles.deleteButton}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        width: "50%",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        color: "#333",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        margin: "5px 0",
        borderRadius: "5px",
        border: "1px solid #ddd",
        fontSize: "16px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
    },
    list: {
        listStyleType: "none",
        padding: "0",
    },
    listItem: {
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    editButton: {
        backgroundColor: "#FFD700",
        color: "black",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        fontSize: "14px",
        marginRight: "10px",
        transition: "background-color 0.3s ease",
    },
    deleteButton: {
        backgroundColor: "#E74C3C",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "background-color 0.3s ease",
    },
};

export default AdminDashboard;
