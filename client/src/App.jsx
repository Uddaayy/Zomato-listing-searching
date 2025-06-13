import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import LocationPage from './pages/LocationPage';
import ImageSearch from './pages/Image-search';
import Search from './pages/Search';
import New from './pages/New';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App font-sans bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/locationR" element={<LocationPage />} />
          <Route path="/image-search" element={<ImageSearch/>} />
          <Route path="/namesearch" element={<New/>} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;