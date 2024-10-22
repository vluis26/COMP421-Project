import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom';
import Order from './Order';
import Banner from './Banner';
import Contact from './Contact';
import Catering from './Catering';

function App() {
  return (
    <>
    <div className='page'>
      <Routes>
        <Route path="/" element={
          <>
            <div>
              <div><Banner/></div>
              <div>
                <div><h1>Weekly Specials</h1></div>
                <ul>
                  <li>deal A</li>
                  <li>deal B</li>
                  <li>deal C</li>
                </ul>
              </div>
            </div>
          </>
        } />
        <Route path="/order" element={
          <>
            <div className='page'>
              <div><Banner/></div>
              <div className='content'><Order /></div>
            </div>
          </>} />
        <Route path="/contact" element={
          <>
            <div className='page'>
              <div><Banner/></div>
              <div className='content'><Contact/></div>
            </div>
          </>
        }/>
        <Route path="/catering" element={
          <>
            <div className='page'>
              <div><Banner/></div>
              <div className='content'><Catering/></div>
            </div>
          </>
        }/>
      </Routes>
      </div>
    </>
  );
}

export default App;