import logo from './logo.svg';
import './App.css';
import NovelDexie from './models/concretes/Dexie/NovelDexie';


import Librarian from './components/Librarian/Librarian';
import NovelModelController from './controllers/NovelModelController';

import Navbar from './uicomponents/Navbar/Navbar';

function App() {
  window.librarian = new Librarian(new NovelModelController());

  return (
    <div className="App">
        <Navbar />
    </div>
  );
}

export default App;
