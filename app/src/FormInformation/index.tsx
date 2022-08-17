import React, { Component } from 'react';
import {
    ScrollView,
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable'

class FormInformation extends Component {

    state = {
        name: '',
        description: '',
        contact: ''
    }

    onRequest = async () => {
        try {
            const res = await axios.post('http://192.168.15.82:3000/information', { ...this.state });
            return res.data;
        } catch (error) {
            console.log('erro: ', error)
        }
    };

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <Animatable.View
                        animation='fadeInLeft'
                        delay={500}
                        style={styles.containerHeader}
                    >
                        <Text style={styles.message}>Cadastro de informações</Text>
                    </Animatable.View>
                    <Animatable.View
                        animation='fadeInUp'
                        style={styles.containerForm}
                    >
                        <Text style={styles.title}>Estabelecimento</Text>
                        <TextInput
                            placeholder='Nome do estabelecimento'
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={(name) => {
                                this.setState({ name })
                            }}
                        />
                        <Text style={styles.title}>Descrição</Text>
                        <TextInput
                            placeholder='Descrição'
                            style={styles.input}
                            value={this.state.description}
                            onChangeText={(description) => {
                                this.setState({ description })
                            }}
                        />
                        <Text style={styles.title}>Contato</Text>
                        <TextInput
                            placeholder='Contato'
                            style={styles.input}
                            value={this.state.contact}
                            onChangeText={(contact) => {
                                this.setState({ contact })
                            }}
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
        marginBottom: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default FormInformation