import MessageCard from '../MessageCard/MessageCard.jsx';
import "./main.css";

function Main({ messages }) {
  return (
    <main>
      <section className='mainheader-container'>
        <input type="text" />
      </section>
      <section className='messages-container'>
        {messages.map(post => (
          <MessageCard key={post.id} username={post.username} text={post.text}/>
        ))}
      </section>
    </main>
  )
}

export default Main;