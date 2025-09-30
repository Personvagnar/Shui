import './messageCard.css'

function MessageCard({ username, text }) {
  return (
    <section className='messageCard-item'>
        <h3 className='messageCard-username'>{username}</h3>
        <p className='messageCard-text'>{text}</p>
    </section>
  )
}

export default MessageCard