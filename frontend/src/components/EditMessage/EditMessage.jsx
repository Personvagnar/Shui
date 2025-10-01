import "./editMessage.css";
import { useState } from "react";

function EditMessage({ id, username, text: initText, onClose, onUpdated }) {
    const [text, setText] = useState(initText);
    const [error, setError] = useState(null);

    async function handleUpdate() {

        try {
            await onUpdated(text);
            setError(null);

            onClose?.();
        } catch(err) {
            setError(err.message);
        }
    }

    function cancelBtn() {
        onClose?.();
    }

    return (
        <section className="editMessage-container">
            <h3>Edit Message</h3>
            <h4>{username}</h4>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`editMessage-text${error ? " errorclass" : ""}`}
                placeholder={error ?? "This field cannot be empty..."}
                />
            <section className="editMessage-buttons">
                <button onClick={handleUpdate}><i className="fa-solid fa-check"></i></button>
                <button onClick={cancelBtn}><i className="fa-solid fa-xmark"></i></button>
            </section>
        </section>
    );
}

export default EditMessage;