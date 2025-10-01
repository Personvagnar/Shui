import EditMessage from '../EditMessage/EditMEssage.jsx';
import './messageCard.css'
import { useState } from 'react'

function MessageCard({ id, username, text, onDeleted, onUpdated }) {
  const [showButtons, setShowButtons] = useState(false);
  const [editMessage, setEditMessage] = useState(false);

  function openOptions() {
    setShowButtons(prev => !prev);
  }

  return (
      <section className='messageCard-item' onClick={openOptions}>
          <h3 className='messageCard-username'>{username}</h3>
          <p className='messageCard-text'>{text}</p>

          {showButtons && (
            <section className='messageCard-buttons'>
              <button onClick={(e) => {
                  e.stopPropagation();
                  setEditMessage(true);
                }}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={(e) => {
                  e.stopPropagation();
                  onDeleted?.();
                  }} 
                >
                  <i className="fa-solid fa-xmark"></i>
              </button>
            </section>
          )}
          
          {editMessage && (
            <EditMessage
              id={id}
              username={username} 
              text={text}
              onClose={() => setEditMessage(false)}
              onUpdated={onUpdated}
            />
          )}
      </section>
  );
}

export default MessageCard