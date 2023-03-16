import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, View, ActivityIndicator, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CreateBet = ({ navigation, route }) => {
    
    const id = route.params.id;
    const [data,setData]= useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleCreateBet = async () => {
        const formBody = {
            lottery_id: id,
            lottery_number: '0408',
            user_id: '61d70b23718b15c7703e6fc0'
        };
        try{
            const response = await fetch(`http://10.0.2.2:3003/api/user/make_bid`, {
                method: 'POST',
                body: JSON.stringify(formBody),
                mode: 'cors',
                headers: {
                    //Header Defination
                    'Authorization':
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqdWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDgwMDUwNzl9.3qGr3NiQa1VSdpTSQlbUJHh6hAGAAvmbnIBogEIWLwQ',
                    'Content-Type':
                    'application/json',
                }
            });
            console.log(response);
            const json = await response.json();
            console.log('tuvo respuesta');
            setData(json);
            setIsLoading(false);
        } catch (error){
            console.log(error.message);
            console.error(error.message);
        }

    };
    
    const loadData = async () => {
        
        try{
            const response = await fetch(`http://10.0.2.2:3003/api/user/get_lotery/${id}`, {
                headers: {
                    //Header Defination
                    'Authorization':
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJqdWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NDgwMDUwNzl9.3qGr3NiQa1VSdpTSQlbUJHh6hAGAAvmbnIBogEIWLwQ',
                }
            });
            const json = await response.json();
            console.log('tuvo respuesta');
            setData(json);
            setIsLoading(false);
        } catch (error){
            console.log(error.message);
            console.error(error.message);
        }
        
    };
    useEffect(() => {
        loadData();
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
                        {   isLoading ?
                        <View>
                            <ActivityIndicator size="small" color="#0000ff" />
                        </View> :
                        <View>
                            <Text>{data.total_amount}</Text>
                            <Text>{data.bid_amount}</Text>
                            <Text>{data.plays_on}</Text>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                                activeOpacity={0.5}
                                onPress={handleCreateBet}>
                                    <Text style={styles.buttonTextStyle}>Make Bid</Text>
                            </TouchableOpacity>
                        </View>
                        }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default CreateBet;
const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
});