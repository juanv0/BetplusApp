import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class Login extends Component {
    _onPressButton(){
        console.log('intentando conectar');
        alert('me la shuparas');
    }

    render(){
        return(
            <View>
                <View>
                    <Button
                        onPress={this._onPressButton}
                        title="Press Me"
                    />
                </View>
            </View>)
    }
}