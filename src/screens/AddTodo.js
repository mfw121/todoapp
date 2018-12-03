import React from "react";
import { View, Dimensions,TextInput, Text } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TodoActionCreators from "../redux/actions/TodoActionCreators";
import Header from "../components/Header";
import styles from "./styles/AddToDoStyles";

const initialState = {
  1: ["#ff1500", "#ffc4bf"],
  2: ["#999300", "#e2e0b1"],
  3: ["#0052ce", "#e0eaf9"]
};

const initialState2 = {
  1: ["#ffc4bf", "#ff1500"],
  2: ["#e2e0b1", "#999300"],
  3: ["#e0eaf9", "#0052ce"]
};

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    isDateTimePickerVisible: false,
    text: "",
    selectedDate: "",
    allTags2: initialState,
    toggle: false,
    selectedColor: "",
    currentKey: ""
  };

  onSubmit() {
    const { addTodo } = this.props;
    colors = Object.assign({}, initialState);
    console.log(colors[this.state.currentKey][1]);
    addTodo(
      this.state.text,
      this.state.selectedDate,
      colors[this.state.currentKey][1]
    );
  }

  onPress = (key, index) => {
    const colors = Object.assign({}, initialState);
    const colors2 = Object.assign({}, initialState2);

    if (!this.state.toggle) {
      let prevKey = this.state.currentKey;
      if (this.state.currentKey !== "" && this.state.currentKey !== key) {
        colors[prevKey][0] = colors2[prevKey][1];
        colors[prevKey][1] = colors2[prevKey][0];
      }
      colors[key][0] = colors2[key][0];
      colors[key][1] = colors2[key][1];

      this.setState({
        ...this.state,
        colors,
        toggle: !this.state.toggle,
        currentKey: key
      });
    } else {
      if (this.state.currentKey !== "" && this.state.currentKey !== key) {
        console.log("condition met");
        let prevKey = this.state.currentKey;
        colors[prevKey][0] = colors2[prevKey][1];
        colors[prevKey][1] = colors2[prevKey][0];

        colors[key][0] = colors2[key][0];
        colors[key][1] = colors2[key][1];
        this.setState({
          ...this.state,
          colors,
          toggle: !this.state.toggle,
          currentKey: key
        });
      }
    }
  };

  onChangeText = text => this.setState({ text });
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };
  h;
  render() {
    const { isDateTimePickerVisible, allTags2 } = this.state;

    this.leftOpenValue = Dimensions.get("window").width;
    this.rightOpenValue = -Dimensions.get("window").width;

    const tags2 = Object.keys(allTags2).map((key, index) => {
      return (
        <View key={index} style={{ padding: 5 }}>
          <Text
            onPress={() => this.onPress(key, index)}
            style={[
              styles.CircleShapeView,
              {
                backgroundColor: Object.values(this.state.allTags2)[index][0]
              }
            ]}
          />
        </View>
      );
    });

    return (
      <View>
        <Header title="Add" />
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="What do you want to do?"
            placeholderTextColor="grey"
            numberOfLines={5}
            multiline={true}
            value={this.state.text}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={{ flexDirection: "row", padding: 10 }}>{tags2}</View>
        <View>
          <Button title="Due On" onPress={this._showDateTimePicker} />
        </View>
        <Button
          backgroundColor="#96cb7f"
          title="Add"
          onPress={() => this.onSubmit()}
        />
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(TodoActionCreators, dispatch);
};

const mapStateToProps = state => ({
  todosReducer: state.todosReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
