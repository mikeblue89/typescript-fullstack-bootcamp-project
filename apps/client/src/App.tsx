import SearchPage from './components/searchPage/searchPage.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetailPage from './components/productDetailPage/productDetailPage.component';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
