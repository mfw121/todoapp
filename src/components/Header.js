import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const Header = props => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.2,
    backgroundColor: "#96cb7f",
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    fontSize: 20,
    color: "#000"
  }
});

export default Header;
