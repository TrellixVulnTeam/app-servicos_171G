import React, { Component } from 'react'
import { ScrollView, SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import axios from 'axios';

class CadUsuarios extends Component {

    state = {
        email: '',
        senha: ''
    }

    onRequest = async () => {
        try {
            const res = await axios.post('http://192.168.15.82:3000/user', { ...this.state });
            if (res) {
                Alert.alert('Dados gravados no banco com sucesso!')
            }
            return res.data;
        } catch (error) {
            console.log('erro: ', error)
        }
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <Animatable.View
                        animation='fadeInLeft'
                        delay={500}
                        style={styles.containerHeader}
                    >
                        <Text style={styles.message}>Cadastro de usuário</Text>
                    </Animatable.View>
                    <Animatable.View
                        animation='fadeInUp'
                        style={styles.containerForm}
                    >
                        <Text style={styles.title}>E-mail</Text>
                        <TextInput
                            placeholder='Digite um email...'
                            style={styles.input}
                            value={this.state.email}
                            onChangeText={(email) => {
                                this.setState({ email })
                            }}
                        />
                        <Text style={styles.title}>Senha</Text>
                        <TextInput
                            placeholder='Digite sua senha...'
                            style={styles.input}
                            value={this.state.senha}
                            onChangeText={(senha) => {
                                this.setState({ senha })
                            }}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity
                            onPress={this.onRequest}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </SafeAreaView>
            </ScrollView>
        )
    }
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
    }
})

export default CadUsuarios