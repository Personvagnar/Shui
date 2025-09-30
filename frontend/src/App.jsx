import { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('https://vzcjtfer6l.execute-api.eu-north-1.amazonaws.com/messages')
    .then(res => res.json())
    .then(data => setMessages(data))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className='app'>
      <Header/>
      <Main messages={messages}/>
    </div>
  )
}

export default App;