"use client";
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";

// Extend props to accept onClick etc., but keep styles the same
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
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
        marginTop: "10px"
      }}
      onMouseOver={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = "#0d8ddb";
      }}
      onMouseOut={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = "#1da1f2";
      }}
      {...props} // Now supports onClick, disabled, etc.
    >
      {props.children || "Tweet"}
    </button>
  );
}

// Keep Logo as-is
export function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        backgroundColor: isHovered ? "rgba(29, 161, 242, 0.1)" : "transparent",
        padding: "10px",
        borderRadius: "9999px",
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
