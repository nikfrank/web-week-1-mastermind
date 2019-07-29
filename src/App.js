import React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { actions } from './store';
import CodeInput from './CodeInput';

const App = ({ code, guesses, setCode, guess })=> (
  <div className='App'>
    <div className='code-container'>
      <CodeInput code={code} onChange={setCode} colors={6} />
    </div>
    <button className='guess' onClick={guess}>GUESS</button>
    <div className='guesses'>
      {guesses.map((guess, i)=> (
        <div className='guess-container' key={i}/>
      ))}
    </div>
  </div>
);

export default connect(state => state, actions)(App);
