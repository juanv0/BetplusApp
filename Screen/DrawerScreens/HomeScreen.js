import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Text, SafeAreaView, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({navigation}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const loadData = async () => {
        try
        {
            console.log('before fetch');
        const response = await fetch(`http://10.0.2.2:3003/api/user/get_loteries`, {
        headers: {
            //Header Defination
            'Authorization':
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqdWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDgwMDUwNzl9.3qGr3NiQa1VSdpTSQlbUJHh6hAGAAvmbnIBogEIWLwQ',
        }
        
        });
        const json = await response.json();
        console.log(json);
        setData(json);
        setIsLoading(false);
    }
        catch(error)  {
            //Hide Loader
            console.log(error.message);
            console.error(error.message);
        };
    };
    useEffect(() => {
        loadData();
        //console.log(data);
        console.log('after loadData');
    }, []);
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
                        data.map((item, index) => (
                            
                            <TouchableOpacity key = {item._id}  onPress={() => navigation.navigate("CreateBet", { id: item._id })}>
                                <View  key = {item._id} style = {styles.item}>
                                <Text>{item.owner}</Text>
                                <Text>{item.plays_on}</Text>
                            </View>

                            </TouchableOpacity>
                        ))
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