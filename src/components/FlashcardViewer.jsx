import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { Link } from 'react-router-dom';
import Header from './Header';

const FlashcardViewer = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false); // Track if the card is flipped
    const isNavigatingRef = useRef(false); // Ref to track navigation state

    useEffect(() => {
        // Fetch flashcards from the backend
        axios.get('http://localhost:8000/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => console.error('Error fetching flashcards:', error));
    }, []);

    const handleNext = () => {
        // Set navigating state to true
        isNavigatingRef.current = true;
        // Update current index
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        // Set navigating state to true
        isNavigatingRef.current = true;
        // Update current index
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    useEffect(() => {
        if (isNavigatingRef.current) {
            setFlipped(false); // Reset the flipped state
            isNavigatingRef.current = false; // Reset the navigation state
        }
    }, [currentIndex]);

    if (flashcards.length === 0) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            {/* <Header />/ */}
            <Flashcard 
                flashcard={flashcards[currentIndex]} 
                flipped={flipped} 
                setFlipped={setFlipped} 
            />
            <div style={styles.controls}>
                <button onClick={handlePrevious} style={styles.button}>Previous</button>
                <button onClick={handleNext} style={styles.button}>Next</button>
            </div>

        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7',
    },
    controls: {
        display: 'flex',
        marginTop: '20px',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        fontSize: '16px',
    },
    link: {
        marginTop: '20px',
        textDecoration: 'none',
    },
    loading: {
        fontSize: '24px',
        color: '#888',
    },
};

export default FlashcardViewer;
