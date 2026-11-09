import { useState, useEffect } from "react";
import Skill from "./Skill";

const API = "http://localhost:3001/api/skills";

function App() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setSkills(data));
  }, []);

  async function addSkill() {
    if (newSkill.trim() === "") return;
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSkill.trim() }),
    });
    setSkills(await res.json());
    setNewSkill("");
  }

  async function removeSkill(name) {
    const res = await fetch(`${API}/${encodeURIComponent(name)}`, {
      method: "DELETE",
    });
    setSkills(await res.json());
  }

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>Hello, Nana!</h1>
      <h2>Skills I'm learning</h2>
      <ul>
        {skills.map((skill) => (
          <Skill key={skill} name={skill} onDelete={removeSkill} />
        ))}
      </ul>
      <input
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="Add a skill"
      />
      <button onClick={addSkill}>Add</button>
    </div>
  );
}

export default App;