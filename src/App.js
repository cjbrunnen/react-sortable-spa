import pipedrive from "./images/pipedrive-logo.png";
import "./App.css";
import SimpleList from "./components/SimpleList";

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
        
        <SimpleList />
      </div>
    </div>
  );
}

export default App;
