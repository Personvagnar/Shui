import "./NewMessage.css";
import { useState } from "react";
import { postMessage } from "../../services/api.js";

function NewMessage({ onClose }) {
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');

    async function handleSubmit() {
        if (!username.trim() || !text.trim()) return;

        try {
            const message = {username, text};
            const saved = await postMessage(message);

            onClose?.();

            setUsername('');
            setText('');
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className="newmessage-container">
        <h3>New Post</h3>
        <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="newmessage-username"/>
        <textarea  
            placeholder="Input text..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="newmessage-text"/>
        <button onClick={handleSubmit}>Post</button>
    </section>
  )
}

export default NewMessage