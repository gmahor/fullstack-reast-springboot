import './App.css';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { Home } from './components/home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
    return (
        <>
            <Header />
            <Home />
            <Footer />
        </>
    );
}

export default App
