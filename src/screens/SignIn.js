import React from "react";
import { View, ScrollView, Image, StyleSheet, Dimensions } from "react-native";
import { Button, FormInput } from "react-native-elements";
import { onSignIn, saveUsername } from "../auth";

class SignIn extends React.Component {
  state = {
    text: ""
  };

  onChangeText = text => this.setState({ text });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                source={{
                  uri:
                    "https://facebook.github.io/react-native/docs/assets/favicon.png"
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View>
          <FormInput
            placeholder="Name"
            clearTextOnFocus
            onChangeText={this.onChangeText}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#96cb7f"
            title="Login"
            onPress={() => {
              onSignIn()
                .then(() => saveUsername(this.state.text))
                .then(() => this.props.navigation.navigate("SignedIn"));
            }}
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

export default SignIn;
