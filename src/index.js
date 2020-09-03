/**
 * FYI: This is a demo for class components
 * To use simple-keyboard with React Hooks / Function components, check out:
 * https://simple-keyboard.com/react/demo/hooks
 */
import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import keyNavigation from "simple-keyboard-key-navigation";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = (input) => {
    this.setState({ input });
    console.log("Input changed", input);
  };

  onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = (event) => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={this.onChangeInput}
        />
        <Keyboard
          keyboardRef={(r) => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          modules={[keyNavigation]}
          onModulesLoaded={(keyboard) => {
            console.log(keyboard.modules);
            /**
             * Now you can use:
             * keyboard.modules.keyNavigation.up();
             * etc.
             */
            keyboard.modules.keyNavigation.down();
            keyboard.modules.keyNavigation.right();
            keyboard.modules.keyNavigation.press();
          }}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
