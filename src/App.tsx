import React from 'react';
import './App.css';
import {TableComponent} from "./Components/TableComponent";

const App = () => {
  return (
    <div className="App">
        <div className="git-table">
            <TableComponent repoData={[{id: '1', owner: 'dsd', repoTitle:'sdsds', stars:'5', timeStamp:'3232'}]}/>
        </div>
    </div>
  );
};

export default App;
