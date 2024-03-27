import React, { useState } from 'react';
import remove from '../Images/remove.png';
import add from '../Images/add.png';

function Inputs() {
  const [inputs1, setInputs1] = useState(['']);

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

  const [inputs2, setInputs2] = useState(['']);

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

  return (
    <div className="InputPanel">
      <div className="InputSection1">
        <div className="InputLabel">
          <h2>One main ingredient you want:</h2>
        </div>
        <div className="InputBoxes">
              <input className="input"
                type="text"
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
              <input className="input"
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
              <input className="input"
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
        <input type="range" min="1" max="100" className="slider" id="slider1" style={{ backgroundColor: 'black', border: '1px solid #4CAF50', WebkitAppearance: 'none', appearance: 'none' }}/>
      </div>

      <div>
        <button className="getRecipes"> Get Recipes! </button>
      </div>
    </div>
  );
}

export default Inputs;
