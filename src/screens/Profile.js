import React from "react";
import {
  View,
  ScrollView,
  AsyncStorage,
  StyleSheet,
  Dimensions
} from "react-native";
import { connect } from "react-redux";

import { Button } from "react-native-elements";

import { bindActionCreators } from "redux";
import * as TodoActionCreators from "../redux/actions/TodoActionCreators";

import { onSignOut } from "../auth";

import Header from "../components/Header";

class Profile extends React.Component {
  state = {
    username: ""
  };

  componentDidMount() {
    AsyncStorage.getItem("username")
      .then(res => {
        if (res !== null) {
          this.setState({ username: "Welcome " + res });
        } else {
          console.log("error");
        }
      })
      .catch(err => reject(err));
  }

  logmeout = () => {
    const { clearAll } = this.props;
    clearAll();
    onSignOut().then(() => this.props.navigation.navigate("SignedOut"));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <ScrollView>
            <View>
              <Header title={this.state.username} />
            </View>
          </ScrollView>
        </View>
        <View>
          <Button
            backgroundColor="#96cb7f"
            title="Logout"
            onPress={() => this.logmeout()}
            // onPress={() =>
            //   onSignOut().then(() =>
            //     this.props.navigation.navigate("SignedOut")
            //   )
            // }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get("window").height
  },
  mainContainer: {
    flex: 1,
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(TodoActionCreators, dispatch);
};

const mapStateToProps = state => ({
  todosReducer: state.todosReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
