import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    value: 0,
    binary: [0, 0, 0, 0, 0, 0, 0, 0],
  };
  setOctetValue = (newValue) => {
    this.setState((prevState) => {
      const newBinary = this.updateBinary(newValue);
      return { value: newValue, binary: newBinary };
    });
  };
  increaseOctetValue = (amount) => {
    this.setState((prevState) => {
      const newValue = this.validateValue(prevState.value + amount);
      const newBinary = this.updateBinary(newValue);
      return { value: newValue, binary: newBinary };
    });
  };
  decreaseOctetValue = (amount) => {
    this.setState((prevState) => {
      const newValue = this.validateValue(prevState.value - amount);
      const newBinary = this.updateBinary(newValue);
      return { value: newValue, binary: newBinary };
    });
  };
  validateValue = (newValue) => {
    if (newValue >= 256) {
      newValue = newValue % 256;
    }
    if (newValue < 0) {
      newValue = 256 + (newValue % 256);
    }
    return newValue;
  };
  updateBinary = (newValue) => {
    let binaryString = (newValue >>> 0).toString(2);
    binaryString = binaryString.padStart(8, "0");
    const newBinary = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) {
      let intValue = parseInt(binaryString.charAt(i));
      newBinary[i] = intValue ? intValue : 0;
    }
    return newBinary;
  };
  changeValueManually = (e) => {
    let newValue = e.target.value;
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue >= 256) {
      newValue = 255;
    }
    this.setState((prevState) => {
      const newBinary = this.updateBinary(newValue);
      return { value: newValue, binary: newBinary };
    });
  };
  render() {
    return (
      <div className="App">
        <div className="binary-positions">
          {[...Array(8)].map((e, i) => (
            <div>
              <div className="integer-container border">
                {Math.pow(2, 7 - i)}
              </div>
              <button
                className="button increment-button"
                style={{ margin: "12px", padding: "12px" }}
                onClick={() => {
                  this.increaseOctetValue(Math.pow(2, 7 - i));
                }}
              >
                +
              </button>
              <div className="binary-container border">
                {this.state.binary[i]}
              </div>
              <button
                className="button increment-button"
                style={{ margin: "12px", padding: "12px" }}
                onClick={() => {
                  this.decreaseOctetValue(Math.pow(2, 7 - i));
                }}
              >
                -
              </button>
            </div>
          ))}
        </div>
        <div className="value-input-container">
          <div>
            <button
              className="button set-button"
              onClick={() => this.setOctetValue(255)}
            >
              255
            </button>
          </div>
          <div>
            <input
              className="value-input"
              value={this.state.value}
              onChange={this.changeValueManually}
            />
          </div>
          <div>
            <button
              className="button set-button"
              onClick={() => this.setOctetValue(0)}
            >
              0
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
