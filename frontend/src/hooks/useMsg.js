import { useState, useEffect } from "react";
import { getMessages, postMessage, deleteMessage, updateMessage, getMessageByUser } from "../services/api.js";
import { triggerReset } from "../utils/triggerReset.js";

export function useMsg() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  /*const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };*/

  const loadMessages = async (username) => {
    setLoading(true);
    try {
      const data = username
        ? await getMessageByUser(username)
        : await getMessages();
      setMessages(data);
      setError(null);

      if(data.length === 0) {
        setError('No posts were found with that username. Remember that the search index is case sensitive!');
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerError = triggerReset(setError, loadMessages, 2000);

  const createMessage = async (message) => {
    setLoading(true);
    try {
      const newMsg = await postMessage(message);
      setMessages(prev => [...prev, newMsg]);
      return newMsg;
    } catch (err) {
      triggerError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeMessage = async (id) => {
    setLoading(true);
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const editMessage = async (id, text) => {
    setLoading(true);
    try {
      const editedMsg = await updateMessage(id, text);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, text } : m));
      return editedMsg;
    } catch (err) {
      triggerError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return { messages, loading, error, loadMessages, createMessage, removeMessage, editMessage };
}
