import MessageCard from '../MessageCard/MessageCard.jsx';
import "./main.css";

function Main({ messages, loading, error, onDeleted, onUpdated}) {
  if (loading) return <h5>Loading messages...</h5>;
  if (error) return <h5>Error: {error}</h5>;

  return (
    <main>
      <section className='mainheader-container'>
        <input type="text" />
      </section>
      <section className='messages-container'>
        {messages.map(post => (
          <MessageCard 
            key={post.id}
            id={post.id}
            username={post.username} 
            text={post.text}
            onDeleted={() => onDeleted(post.id)}
            onUpdated={(newText) => onUpdated(post.id, newText)}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
