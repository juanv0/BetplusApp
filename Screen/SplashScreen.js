import React, {useState, useEffect} from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
    const [animating, setAnimating] = useState(true);

    useEffect (() => {
        setTimeout(() => {
            setAnimating(false);
            AsyncStorage.getItem('login_data').then((value) => 
                navigation.replace(
                    value === null ? 'Auth' : 'MainApp'
                ),
            );
        }, 2500);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../Image/aboutreact.png')}
                style={{width: '90%', resizeMode: 'contain', margin: 30}}
            />
            <ActivityIndicator
                animating={animating}
                color='#FFFFFF'
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});