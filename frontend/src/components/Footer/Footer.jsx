import "./footer.css";
import { useState } from "react";
import NewMessage from "../NewMessage/NewMessage.jsx";

function Footer({ onMessageCreated }) {
  const [show, setShow] = useState(false);

  return (
    <footer>
      <button onClick={() => setShow(prev => !prev)}>
        <i className="fa-solid fa-plus"></i>
      </button>
      {show && 
        <NewMessage 
          onClose={() => setShow(false)} 
          onMessageCreated={onMessageCreated} 
        />}
    </footer>
  )
}

export default Footer;