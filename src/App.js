import pipedrive from "./images/pipedrive-logo.png";
import "./App.css";
import SimpleList from "./components/SimpleList";
import styled from 'styled-components'

const AppTitle = styled.h1`
  text-align: left;
  font-size: 24px;
  margin-top: 20px;
`

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          id="pipedrive-logo"
          src={pipedrive}
          alt="white pipedrive logo on blue background"
        />
      </header>

      <div className="main">
        <AppTitle>People's List</AppTitle>
        
        <SimpleList />
      </div>
    </div>
  );
}

export default App;
