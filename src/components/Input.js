import React, { Component } from "react";
import { Animated, View, TextInput, StyleSheet } from "react-native";

class Input extends Component {
  state = {
    text: ""
  };

  onChangeText = text => this.setState({ text });

  onSubmitEditing = () => {
    const { onSubmitEditing } = this.props;
    const { text } = this.state;

    if (!text) return;

    onSubmitEditing(text);
    this.setState({ text: "" });
  };

  render() {
    const { placeholder, placeholderTextColor } = this.props;
    const { selectionColor, underlineColorAndroid } = this.props;
    const { maxLength, clearTextOnFocus } = this.props;
    const { text } = this.state;

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        selectionColor={selectionColor}
        underlineColorAndroid={underlineColorAndroid}
        maxLength={maxLength}
        clearTextOnFocus={clearTextOnFocus}
        onChangeText={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
      />
    );
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#333",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start"
  }
});

export default Input;
