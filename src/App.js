import { React, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [items, setItems] = useState();

  const getItems = async () => {
    const response = await fetch("http://[::1]:3000/item");
    const items = await response.json();
    setItems(items)
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Not Trello
        </p>
      </header>
      <div className='channel'>
      {items ? (
        items.map((item) => {
          return (
            <div className="item">
              <p>{item.title}</p>
            </div>
          )
        })
      ) : (
        <div>No items Found</div>
      )}
      </div>
    </div>
  );
}

export default App;
