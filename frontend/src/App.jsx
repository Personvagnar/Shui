import { useState, useEffect } from 'react'
import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'
import { getMessages } from './services/api.js';


function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMessages()
      .then(data => setMessages(data))
      .catch(error => setError(error.message));
  }, [])

  return (
    <div className='app'>
      <Header/>
      <Main messages={messages}/>
      <Footer />
    </div>
  )
}

export default App;