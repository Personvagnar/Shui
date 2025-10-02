import Header from './components/Header/Header.jsx';
import Main from './components/Main/Main.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';
import { useMsg } from './hooks/useMsg.js';

function App() {
  const { messages, loading, error, loadMessages, createMessage, editMessage, removeMessage } = useMsg();

  return (
    <div className='app'>
      <Header/>
      <Main 
        messages={messages} 
        loading={loading} 
        error={error} 
        onDeleted={removeMessage} 
        onUpdated={editMessage}
        onSearch={loadMessages}
      />
      <Footer onMessageCreated={createMessage} />
    </div>
  )
}

export default App;
