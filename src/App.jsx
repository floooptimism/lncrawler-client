import './App.css';

import Navbar from './uicomponents/Navbar/Navbar';
import { useEffect } from 'react';
import ViewStateRenderer from './uicomponents/ViewState/ViewStateRenderer';


function App() {
  useEffect(() => {
 

  }, [])
  
  return (
    <div className="App">
        <Navbar />
        <ViewStateRenderer />
    </div>
  );
}

export default App;
