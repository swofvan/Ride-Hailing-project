import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/home';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <Navbar/>
      <Home/>
      
      <Footer/>

      {/* <div className="App">
        <h1>Welcome to Rydo Ride-Hailing App</h1>
      </div> */}
    </div>
  );
}

export default App;
