import "./footer.css";
import { useState } from "react";
import NewMessage from "../NewMessage/NewMessage.jsx";

function Footer() {
  const [show, setShow] = useState(false);

  return (
    <footer>
        <button onClick={() => setShow(prev => !prev)}>
          <i class="fa-solid fa-plus"></i>
        </button>
        {show && <NewMessage onClose={() => setShow(false)} />}
    </footer>
  )
}

export default Footer