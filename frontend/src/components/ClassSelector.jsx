import React, { useEffect, useState } from "react";
import axios from "axios";

const ClassSelector = ({ onSelect }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/classes")
      .then((res) => {
        console.log("Classes loaded:", res.data);  // DEBUG
        setClasses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching classes:", err);
      });
  }, []);

  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      style={{ padding: "10px", marginBottom: "20px" }}
    >
      <option value="">Select Class</option>

      {/* FIXED MAPPING */}
      {classes.map((cls) => (
        <option key={cls._id} value={cls._id}>
          {cls.className} - {cls.section}
        </option>
      ))}
    </select>
  );
};

export default ClassSelector;
