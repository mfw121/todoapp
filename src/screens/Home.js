import React from "react";
import { View, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import moment from "moment";
import SwipeView from "react-native-swipeview";
import config from "../config";
import commonStyles from "./styles";
import TodoRowItem from "../components/TodoRowItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as TodoActionCreators from "../redux/actions/TodoActionCreators";

import Header from "../components/Header";

class Home extends React.Component {
  confirmDelete = index => {
    const { deleteActiveTodo } = this.props;
    Alert.alert(
      "Warning",
      "Are you sure, your want to delte this?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteActiveTodo(index) }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { todosReducer } = this.props;

    const { active } = todosReducer;
    const { todos } = active || {};
    const { completeTodo, deleteActiveTodo } = this.props;

    this.leftOpenValue = Dimensions.get("window").width;
    this.rightOpenValue = -Dimensions.get("window").width;

    return (
      <View>
        <Header title="Todo" />
        <FlatList
          data={todos || {}}
          keyExtractor={todo => todo.id}
          enableEmptySections={true}
          ItemSeparatorComponent={() => <View style={commonStyles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeView
              renderVisibleContent={() => (
                <TodoRowItem
                  todo={{ ...item }}
                  index={index}
                  time={moment()
                    .startOf("hour")
                    .fromNow()}
                />
              )}
              renderLeftView={() => (
                <View style={commonStyles.rowLeft}>
                  <Icon
                    style={commonStyles.icon}
                    name={config.icons.check}
                    size={config.constants.hidden_row_icon_size}
                  />
                </View>
              )}
              renderRightView={() => (
                <View style={commonStyles.rowRight}>
                  <Icon
                    style={commonStyles.icon}
                    name={config.icons.times}
                    size={config.constants.hidden_row_icon_size}
                  />
                </View>
              )}
              leftOpenValue={this.leftOpenValue}
              rightOpenValue={this.rightOpenValue}
              swipeDuration={config.constants.row_swipe_duration}
              swipeToOpenPercent={config.constants.row_swipe_open_percent}
              onSwipedLeft={() => this.confirmDelete(index)}
              onSwipedRight={() => {
                completeTodo(index);
                deleteActiveTodo(index);
              }}
            />
          )}
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
)(Home);
