import React from 'react';
import logo from './logo.svg';
import './App.css';
import './reset.css'
import Questions from './Questions'
import quiz from './public/quiz.json'

function App() {

  return (
    <div className="App">
      <header>

      </header>
      <div className="spot-header flex flex justify-center items-center">
        <h1 className="font-bold text-xl">Spot a Lie !</h1>
      </div>
      <div className="container mx-auto px-4 pt-40">
          <p class="font-mono text-lg text-gray-800 text-center">Spot a lie and win indigo add-ons</p>
          <Questions quizData={quiz}></Questions>
      </div>
    </div>
  );
}

export default App;
