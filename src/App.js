import pipedrive from "./images/pipedrive-logo.png";
import "./App.css";
import SimpleList from "./components/SimpleList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="top-bar">
          <img
            id="pipedrive-logo"
            src={pipedrive}
            alt="white pipedrive logo on blue background"
          />
        </div>
      </header>
      <div className="main">
        <SimpleList />
      </div>
      <Footer />
    </div>
  );
}

export default App;
