import React from "react";

const Flashcard = ({ flashcard, flipped, setFlipped }) => {
    const cardContainerStyle = {
        perspective: "1000px", 
    };

    const cardStyle = {
        width: "350px",
        height: "200px",
        position: "relative",
        transformStyle: "preserve-3d",
        transition: "transform 0.6s ease",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        cursor: "pointer",
        margin: "10px auto",
    };

    const faceStyle = {
        position: "absolute",
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: "500",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const frontStyle = {
        ...faceStyle,
        backgroundColor: "#A3E4D7",
        color: "#1B2631",
    };

    const backStyle = {
        ...faceStyle,
        backgroundColor: "#D5DBDB",
        color: "#17202A",
        transform: "rotateY(180deg)", 
    };

    return (
        <div style={cardContainerStyle} onClick={() => setFlipped(!flipped)}>
            <div style={cardStyle}>
                <div style={frontStyle}>
                    {flashcard.question}
                </div>
                <div style={backStyle}>
                    {flashcard.answer}
                </div>
            </div>
        </div>
    );
};

export default Flashcard;
