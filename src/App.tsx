import React from 'react';
import logo from './logo.svg';
import './App.css';
import RecipeCard from './RecipeCard';
import testRecipe from './tempData';

function App() {
  return (
    <div className="App">
      <RecipeCard recipe={testRecipe}/>
    </div>
  );
}

export default App;
