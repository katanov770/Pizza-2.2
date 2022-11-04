import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './components/NotFoundBlock/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import './scss/app.scss';
import { decrement, increment } from './redux/slices/filterSlice';
export const SearchContext = createContext('');

function App() {
  const [searchValue, setSearchValue] = useState('');
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <button aria-label="Increment count" onClick={() => dispatch(increment())}>
        Increment
      </button>
      <span>{count}</span>
      <button aria-label="Decrement count" onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart_empty" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
