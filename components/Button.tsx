"use client";
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";

// Tweet Button Component
export default function Button() {
  return (
    <button
      style={{
        width: "80%",
        backgroundColor: "#1da1f2",
        color: "white",
        fontWeight: "bold",
        padding: "8px 16px",
        border: "none",
        borderRadius: "9999px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        fontSize: "14px",
        marginTop:"10px"
      }}
      onMouseOver={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = "#0d8ddb";
      }}
      onMouseOut={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = "#1da1f2";
      }}
    >
      Tweet
    </button>
  );
}

// Twitter Logo Component with inline hover style
export function Logo() {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        style={{
          backgroundColor: isHovered ? "rgba(29, 161, 242, 0.1)" : "transparent",
          padding: "10px",
          borderRadius: "9999px", // fully rounded
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          display: "inline-block",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <BsTwitter size={30} color="#ffffff" />
      </div>
    );
  }