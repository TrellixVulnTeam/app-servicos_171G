import React, {useState} from 'react'
import {
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function Login() {

    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function onRequest () {
        try {
            const res = await axios.get('http://192.168.15.82:3000/user')
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log('erro: ', error)
        }
    }

    function logar() {
        onRequest()
        {email === 'claudioglopes1@gmail.com' && senha === '123456' ? 
            navigation.navigate('Home') : null
        }
    }

    return (
        <ScrollView>
            <SafeAreaView
                style={styles.container}>
                <Animatable.View
                    animation='fadeInLeft'
                    delay={500}
                    style={styles.containerHeader}
                >
                    <Text style={styles.message}>Bem vindo(a)</Text>
                </Animatable.View>
                <Animatable.View
                    animation='fadeInUp'
                    style={styles.containerForm}
                >
                    <Text style={styles.title}>E-mail</Text>
                    <TextInput
                        placeholder='Digite um email...'
                        style={styles.input}
                        value={email}
                        onChangeText={(email) => {
                            setEmail(email)
                        }}
                    />
                    <Text style={styles.title}>Senha</Text>
                    <TextInput
                        placeholder='Digite sua senha...'
                        style={styles.input}
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={(senha) => {
                            setSenha(senha)
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => logar()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Acessar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('CadUsuarios')}
                        style={styles.buttonRegister}
                    >
                        <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38a69d'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopEndRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#38a69d',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    }
})