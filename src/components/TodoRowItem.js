import React, { Component } from "react";
import { View, Text } from "react-native";
import moment from "moment";

import config from "../config";

import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles/TodoRowItemStyles";

export default class TodoRowItem extends Component {
  render() {
    const { todo, time } = this.props;
    const { text, dueon, tag } = todo;
    const dueDate = moment(dueon);
    const currentDateTime = moment();
    
    return (
      <View style={styles.row} key={todo.id}>
        <View style={styles.timeline}>
          <View style={styles.timelineVerticalLink} />

          <Icon
            style={styles.icon}
            name={config.icons.circle}
            size={config.constants.row_timeline_icon_size}
          />
        </View>
        <View style={styles.content}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.circleShapeView, { backgroundColor: tag }]} />
            <Text style={styles.text}>{text}</Text>
          </View>
          <Text style={[styles.time, { fontSize: 20 }]}>
            due in {dueDate.diff(currentDateTime, "minutes")} minutes
          </Text>
        </View>
      </View>
    );
  }
}
