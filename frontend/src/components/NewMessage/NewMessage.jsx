import "./NewMessage.css";
import { useState } from "react";

function NewMessage({ onClose, onMessageCreated }) {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit() {
    const message = { username, text };

    try {
      await onMessageCreated(message);
      setUsername('');
      setText('');
      setError(null);

      onClose?.();
    }catch(err) {
      setError(err.message);
    }

  }

  function cancelBtn() {
    setUsername('');
    setText('');
    onClose?.();
  }

  return (
    <section className="newmessage-container">
      <h3>New Post</h3>
      <input 
        type="text" 
        placeholder={error ?? "Username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={`newmessage-username${error ? " errorclass" : ""}`}/>
      <textarea  
        placeholder={error ?? "Input text..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`newmessage-text${error ? " errorclass" : ""}`}/>
      <section className="newmessage-buttons">
        <button onClick={handleSubmit}><i className="fa-solid fa-check"></i></button>
        <button onClick={cancelBtn}><i className="fa-solid fa-xmark"></i></button>
      </section>
    </section>
  );
}

export default NewMessage;