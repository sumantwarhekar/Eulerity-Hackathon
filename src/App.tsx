
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { PetsProvider } from './context/PetsContext';
import { SelectionProvider } from './context/SelectionContext';
import { Navbar } from './components/Layout/Navbar';
import { Home } from './pages/Home';
import { PetDetail } from './pages/PetDetail';
import { About } from './pages/About';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <PetsProvider>
        <SelectionProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets/:slug" element={<PetDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </SelectionProvider>
      </PetsProvider>
    </Router>
  );
}

export default App;
