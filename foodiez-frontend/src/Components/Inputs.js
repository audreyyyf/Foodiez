import React, { useState } from 'react';
import remove from '../Images/remove.png';
import add from '../Images/add.png';

function Inputs({ onDataReceived, setLoading }) {


  const [main, setMain] = useState('');
  const [inputs1, setInputs1] = useState(['']);
  const [inputs2, setInputs2] = useState(['']);
  const [timeLimit, setTimeLimit] = useState(100000); // Initial value of time limit

  const handleChangeMain = event => {
    setMain(event.target.value);
  };

  const handleChange1 = (index, event) => {
    const newInputs = [...inputs1];
    newInputs[index] = event.target.value;
    setInputs1(newInputs);
  };

  const addInput1 = () => {
    if (inputs1.length < 2) {
      setInputs1([...inputs1, '']);
    }
  };

  const removeInput1 = index => {
    if (inputs1.length > 1) {
      const newInputs = [...inputs1];
      newInputs.splice(index, 1);
      setInputs1(newInputs);
    }
  };

  const handleChange2 = (index, event) => {
    const newInputs = [...inputs2];
    newInputs[index] = event.target.value;
    setInputs2(newInputs);
  };

  const addInput2 = () => {
    if (inputs2.length < 3) {
      setInputs2([...inputs2, '']);
    }
  };

  const removeInput2 = index => {
    if (inputs2.length > 1) {
      const newInputs = [...inputs2];
      newInputs.splice(index, 1);
      setInputs2(newInputs);
    }
  };

  const handleGetRecipes = () => {
    setLoading(true); // Set loading to true when starting the fetch

    const inputData = {
      main: main,
      want: inputs1,
      dontWant: inputs2,
      time_limit: timeLimit // Example time limit
    };

    fetch('http://127.0.0.1:5000/get-recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data (e.g., display recipes to the user)
      console.log(data);
      const allrecipesArray = data.allrecipes_result || []; // Access allrecipes_result
      const food52Array = data.food52_result || []; // Access food52_result
      const delishArray = data.delish_result || []; // Access delish_result
      const myRecipesArray = data.myRecipes_result || []; //Access myRecipes_result
      const recipesArray = { allrecipesArray, food52Array, delishArray, myRecipesArray }; // Combine into a single object
      onDataReceived(recipesArray);
      setLoading(false); // Set loading to false when data is received
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      setLoading(false); 
    });
  };

  return (
    <div className="InputPanel">
      <div className="InputSection1">
        <div className="InputLabel">
          <h2>One main ingredient you want:</h2>
        </div>
        <div className="InputBoxes">
          <input
            className="input"
            type="text"
            value={main}
            onChange={handleChangeMain}
          />
        </div>
      </div>
      <div className="InputSection2">
        <div className="InputLabel">
          <h2>Up to two other ingredients you want:</h2>
        </div>
        <div className="InputBoxes">
          {inputs1.map((input, index) => (
            <div key={index}>
              <input
                className="input"
                type="text"
                value={input}
                onChange={event => handleChange1(index, event)}
              />
              <button className="removeButton" onClick={() => removeInput1(index)}>
                <img className="removeImage" src={remove} alt="Remove Button" />
              </button>
            </div>
          ))}
          {inputs1.length < 2 && <button onClick={addInput1}>Add Input</button>}
        </div>
      </div>
      <div className="InputSection3">
        <div className="InputLabel">
          <h2>Up to three ingredients you can't have:</h2>
        </div>
        <div className="InputBoxes">
          {inputs2.map((input, index) => (
            <div key={index}>
              <input
                className="input"
                type="text"
                value={input}
                onChange={event => handleChange2(index, event)}
              />
              <button className="removeButton" onClick={() => removeInput2(index)}>
                <img className="removeImage" src={remove} alt="Remove Button" />
              </button>
            </div>
          ))}
          {inputs2.length < 3 && <button onClick={addInput2}>Add Input</button>}
        </div>
      </div>
      <div className="InputLabel">
        <h2> How much time you have: </h2>
      </div>
      <div className="InputSliders">
        <input type="range" min="1" max="1000" className="slider" id="slider1" style={{ backgroundColor: 'cream', border: '1px solid black', WebkitAppearance: 'none', appearance: 'none' }}
        onChange={(e) => setTimeLimit(parseInt(e.target.value))} // Update timeLimit when slider value changes
        />
        <p>{timeLimit} minutes </p> 
      </div>

      <div>
        <button className="getRecipes" onClick={handleGetRecipes}>Get Recipes!</button>
      </div>
    </div>
  );
}

export default Inputs;
