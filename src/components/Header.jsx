import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.companyName}>TUF</h1>
            <div>
            <Link to="/" style={styles.adminLink}>
                Home
            </Link>
            <Link to="/admin" style={styles.adminLink}>
                Admin Page
            </Link>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#483D8B',
        padding: "10px",
        color: 'white',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    companyName: {
        margin: 0,
        fontSize: '26px', 
    },
    adminLink: {
        textDecoration: 'none',
        color: 'white',
        padding: '10px 20px',
        fontWeight: "bold",
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
};

export default Header;
