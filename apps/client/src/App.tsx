import SearchPage from './components/searchPage/searchPage.component';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
