import { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
  console.log("Player component rendered - ", initialName);
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(() => !isEditing);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPlayerName(value);
  };

  return (
    <li className={isActive ? "active" : undefined}>
      <span className='player'>
        {isEditing ? (
          <input
            type='text'
            required
            value={playerName}
            onChange={handleChange}
          ></input>
        ) : (
          <span className='player-name'>{playerName}</span>
        )}
        <span className='player-symbol'>{symbol}</span>
      </span>

      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
