import React from 'react'
import { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
// import { auth } from '../firebase'
// import { firebase } from '../firebase'
// import { getAuth } from "firebase/auth";
//Try 2:
// import auth from '@react-native-firebase/auth';
//Try 3:
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const navigation = useNavigation()
    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.navigate("Home")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with", user.email)

        }) 
        .catch(error => alert(error.message))
    }
      
    const handleLogIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with:", user.email)
            // navigation.navigate("Home")

        }) 
        .catch(error => alert(error.message))
    }
    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >   
        {/* <LoginApp></LoginApp> */}
        <View style = {styles.inputContainer}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={ text=> setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={ text=> setPassword(text)}
                style={styles.input}
                secureTextEntry
            />  
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogIn}
                style={styles.button}
            >
                <Text style={styles.buttonText}> Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}> Register</Text>
            </TouchableOpacity>
            
        </View>

    </KeyboardAvoidingView>
    );
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius:10,
        marginTop:5
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#078259",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonOutline:{
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#078259",
        borderWidth: 2
    },
    buttonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16

    },
    buttonOutlineText:{
        color: "#078259",
        fontWeight: '700',
        fontSize: 16
    }
})
