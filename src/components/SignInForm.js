import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const request = axios.create({
  baseURL: 'https://us-central1-one-time-password-efa41.cloudfunctions.net'
});

class SignInForm extends Component {
  state = {
    phone: '',
    code: ''
  };

  handleSubmit = async () => {
    try {
      const { data } = await axios.post('/verifyOneTimePassword', { ...this.state });
      firebase.auth().signInWithCustomToken(data.token);

    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter phone number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
            keyboardType="numeric"
          />
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    )
  }
}

export default SignInForm;
