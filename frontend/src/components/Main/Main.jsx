import { useState, useEffect } from 'react';
import MessageCard from '../MessageCard/MessageCard.jsx';
import "./main.css";

function Main({ messages, loading, error, onDeleted, onUpdated, onSearch}) {
  const [search, setSearch] = useState('');

  const handleChange = (value) => {
    setSearch(value);
    onSearch(value.trim());
  }

  return (
    <main>
      <section className='mainheader-container'>
        <input 
          type="text" 
          placeholder='Search by username...'
          onChange={(e) => handleChange(e.target.value)}
          />
      </section>
      <section className='messages-container'>
        {loading && <h5>Loading messages...</h5>}
        {error && <h5>Error: {error}</h5>}

        {!loading && !error && 
          [...messages]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(post => (
              <MessageCard 
                key={post.id}
                id={post.id}
                username={post.username} 
                text={post.text}
                createdAt={post.createdAt}
                onDeleted={() => onDeleted(post.id)}
                onUpdated={(newText) => onUpdated(post.id, newText)}
              />
            ))
        }
      </section>
    </main>
  );
}

export default Main;
