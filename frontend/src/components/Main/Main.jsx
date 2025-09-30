import React from 'react'
import MessageCard from '../MessageCard/MessageCard.jsx';
import "./main.css";

function Main({ messages }) {
  return (
    <main>
      <h2>Messages</h2>
      <section className='messages-container'>
        {messages.map(post => (
          <MessageCard key={post.id} username={post.username} text={post.text}/>
        ))}
      </section>
    </main>
  )
}

export default Main;