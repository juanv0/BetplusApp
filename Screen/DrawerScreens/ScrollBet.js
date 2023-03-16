import React, { Component, useState } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

class ScrollBet extends Component {
    state = {
        data: []
    };
    _onPressButton(id){
        console.log(`item clicked with ${id}`);
        navigation.navigate('RegisterScreen');
    }
    loadData = () => {
        
        fetch('http://10.0.2.2:3003/api/user/get_loteries', {
        headers: {
            //Header Defination
            'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqdWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDgwMDUwNzl9.3qGr3NiQa1VSdpTSQlbUJHh6hAGAAvmbnIBogEIWLwQ',
        }
        })
        .then((response) => 
            response.json())
        .then((responseJson) => {
            //Hide Loader
            console.log('got server response');
            console.log(responseJson);
            this.setState({
                data: responseJson
            });
        })
        .catch((error) => {
            //Hide Loader
            console.log(error.message);
            console.error(error.message);
        });
        
    }
    componentDidMount(){
        this.loadData();
        
      }
    render() {
        return (
            <View>
                <ScrollView>
                    {
                        this.state.data.map((item, index) => (
                            
                            <TouchableOpacity key = {item._id}  onPress={() => navigation.navigate("CreateBet")}>
                                <View  key = {item._id} style = {styles.item}>
                                <Text>{item.owner}</Text>
                                <Text>{item.plays_on}</Text>
                            </View>

                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>

            </View>
        )
    }
}
export default ScrollBet;

const styles = StyleSheet.create ({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});