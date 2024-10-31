// src/Popup.js
import React, { useState, useEffect } from 'react';

function Popup() {
  const [tasks, setTasks] = useState([]);
  const [removedTasks, setRemovedTasks] = useState([]); // State for removed tasks
  const [task, setTask] = useState('');
  const [showHistory, setShowHistory] = useState(false); // Toggle for showing history

  useEffect(() => {
    // Load tasks and removed tasks from chrome.storage when component mounts
    /* global chrome */
    chrome.storage.sync.get(['tasks', 'removedTasks'], (result) => {
      if (result.tasks) {
        setTasks(result.tasks);
      }
      if (result.removedTasks) {
        setRemovedTasks(result.removedTasks);
      }
    });
  }, []);

  const addTask = () => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTask('');
    /* global chrome */
    chrome.storage.sync.set({ tasks: newTasks }); // Save to chrome.storage
  };

  const removeTask = (taskToRemove) => {
    const newTasks = tasks.filter(t => t !== taskToRemove);
    const newRemovedTasks = [...removedTasks, taskToRemove]; // Add removed task to history
    setTasks(newTasks);
    setRemovedTasks(newRemovedTasks);
    
    /* global chrome */
    chrome.storage.sync.set({ tasks: newTasks, removedTasks: newRemovedTasks }); // Save updated tasks and removed tasks
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory); // Toggle the history visibility
  };

  const removeTaskFromHistory = (taskToRemoveFromHistory) => {
    const newRemovedTasks = removedTasks.filter(t => t !== taskToRemoveFromHistory); // Add removed task to history
    setRemovedTasks(newRemovedTasks);
    
  };

  const addTaskFromHistory = (taskFromHistory) => {
    const newTasks = [...tasks, taskFromHistory];
    setTasks(newTasks);
    setTask('');
    /* global chrome */
    chrome.storage.sync.set({ tasks: newTasks }); // Save to chrome.storage

    const newRemovedTasks = removedTasks.filter(t => t !== taskFromHistory); // Add removed task to history
    setRemovedTasks(newRemovedTasks);
    
  };

  const buttonStyles = {
    marginLeft: 'auto',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  }

  // Define styles in a separate variable
  const styles = {
    popup: {
      width: '300px',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    input: {
      width: 'calc(100% - 50px)',
      padding: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    addButton: {
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#28a745',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    historyButton: buttonStyles,
    trashButton: buttonStyles,
    list: {
      listStyle: 'none',
      padding: 0,
      marginTop: '20px',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #eee',
    },
    removeButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
    },
    historyContainer: {
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.popup}>
      <div style={styles.title}>
        <h2 style={{ margin: 0 }}>{ showHistory ? 'Removed List' : 'Check List' }</h2>
        <button onClick={toggleHistory} style={styles.historyButton}>
          <i className={`fa ${showHistory ? 'fa-history' : 'fa-history'}`} aria-hidden="true" />
        </button>
      </div>
      
      {showHistory ? (
        <div style={styles.historyContainer}>
          <ul style={styles.list}>
            {removedTasks.map((t, index) => (
              <li key={index} style={styles.listItem}>
                {index + 1}. {t}
                <button onClick={() => removeTaskFromHistory(t)} style={styles.trashButton}>
                  <i class="fa fa-trash" aria-hidden="true" />
                </button>
                <button onClick={() => {addTaskFromHistory(t)}} style={{ marginLeft: '2px' }}>
                  <i class="fa fa-plus" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ): (<>
     
        <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new item"
        style={styles.input}
      />
      <button onClick={addTask} style={styles.addButton} disabled={!task} >Add</button>
      <ul style={styles.list}>
        {tasks.map((t, index) => (
          <li key={index} style={styles.listItem}>
            {index + 1}. {t} 
            <button onClick={() => removeTask(t)} style={styles.removeButton}>Remove</button>
          </li>
        ))}
      </ul>
      </>
      )}
    </div>
  );
}

export default Popup;
