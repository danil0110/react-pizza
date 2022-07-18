import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import PizzaDetails from './pages/PizzaDetails';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='pizza/:id' element={<PizzaDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
