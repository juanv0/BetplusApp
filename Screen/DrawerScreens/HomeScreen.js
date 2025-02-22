import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Text, SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({navigation}) => {
    
    const [data, setData] = useState([]);
    const [emptyData, setEmptyData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadData = async () => {
        const controller = new AbortController();
        try
        {
            console.log('at home screen');
            
            const raw_data = await AsyncStorage.getItem('login_data');
            const authData = JSON.parse(raw_data);
            let token = authData.token;
            console.log(token);
            console.log('after token');
            const timeoutId = setTimeout(() => controller.abort(), 20000);
            const response = await fetch(`http://192.168.1.1:3007/api/offer/all`, {
            headers: {
                //Header Defination
                'Authorization':
                'Bearer ' + token,
            },
            signal: controller.signal
        
        });
        clearTimeout(timeoutId);
        if (response.status === 200){
            const json = await response.json();
            console.log(json);
            setData(json);
            setEmptyData(false);
        }else {
            console.log("empty Set");
        }
        
        setIsLoading(false);
    }
        catch(error)  {
            //Hide Loader
            clearTimeout(timeoutId);
            console.log(error.message);
            console.error(error.message);
        };
    };
    useEffect(() => {
        loadData();
        //console.log(data);
        console.log('after loadData');
    }, []);
    const DisplayList = () => {
        if (emptyData){
            return(
                <View>
                    <Text>Oooops 0 Entries found</Text>
                </View>
            )
        }else{
            data.map((item, index) => (
                            
                <TouchableOpacity key = {item._id}  onPress={() => navigation.navigate("CreateBet", { id: item._id })}>
                    <View  key = {item._id} style = {styles.item}>
                    <Text>{item.owner}</Text>
                    <Text>{item.plays_on}</Text>
                </View>

                </TouchableOpacity>
            ))
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, padding: 16}}>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View>
                <ScrollView>
                    {   isLoading ?
                        <View>
                            <ActivityIndicator size="small" color="#0000ff" />
                        </View> :
                        <DisplayList />
                    }
                </ScrollView>

            </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

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