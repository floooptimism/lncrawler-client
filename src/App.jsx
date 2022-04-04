import './App.css';

import Navbar from './uicomponents/Navbar/Navbar';
import { useEffect } from 'react';
import ViewStateRenderer from './uicomponents/ViewState/ViewStateRenderer';
import Liaison from './functionalcomponents/Liaison/Liaison';


function App() {

  return (
    <div className="App">
        <Navbar />
        <ViewStateRenderer />
    </div>
  );
}

export default App;
