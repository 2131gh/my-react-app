function Skill({ name, onDelete }) {
  return (
    <li>
      {name}{" "}
      <button onClick={() => onDelete(name)}>Remove</button>
    </li>
  );
}

export default Skill;