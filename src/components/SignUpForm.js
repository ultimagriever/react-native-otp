import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const request = axios.create({
  baseURL: 'https://us-central1-one-time-password-efa41.cloudfunctions.net'
});

class SignUpForm extends Component {
  state = {
    phone: ''
  };

  handleSubmit = async () => {
    try {
      const responseCreate = await request.post('/createUser', { ...this.state });

      const responseOTP = await request.post('/requestOneTimePassword', { ...this.state });
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
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    )
  }
}

export default SignUpForm;
