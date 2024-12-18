import React from 'react';
import EntryManagement from './components/entry/EntryManagement'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';


function App() {
  return (
    <div className="App">
      <Header/>
      <EntryManagement/>
      <Footer/>
    </div>
  );
}

export default App;
