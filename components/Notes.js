import React, { Component } from 'react';
import { View, Text, Alert, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Item from './Item';

class Notes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            funkcja: null,
            render: [],
            finder: ""
        };
    }


    componentDidMount = () => {
        this.state.funkcja = this.props.navigation.addListener('focus', () => {
            this.refresh()
        });

        this.refresh()

    }
    componentWillUnmount() {
        this.state.funkcja();
    }

    deleteAlert(p1, key) {
        Alert.alert(
            "Usunąć notatkę?",
            "Spowoduje to nieodwracalne usunięcie notatki",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: this.delete.bind(this, p1, key) }
            ]
        )
    }

    async delete(p1, key) {
        let array = []
        for (let i in this.state.render) {
            if (this.state.render[i].props.data.key != key) {
                array.push(this.state.render[i])
            }
        }
        this.setState({ render: array })
        let keyArray = await SecureStore.getItemAsync("keys");
        let colorArray = await SecureStore.getItemAsync("colors")
        keyArray = keyArray.split(",")
        for (let i in keyArray) {
            if (keyArray[i] == key) {
                keyArray.splice(i, 1)
            }
        }
        colorArray = colorArray.split("}")
        for (let i = 0; i < colorArray.length - 1; i++) {
            colorArray[i] = colorArray[i] + "}"
            if (colorArray[i][0] == ',' && colorArray[i][1] != '{') {
                colorArray[i] = colorArray[i].slice(4)
            } else if (colorArray[i][0] == ',' && colorArray[i][1] == '{') {
                colorArray[i] = colorArray[i].slice(1)
            }
            colorArray[i] = JSON.parse(colorArray[i])
        }
        for (let i in colorArray) {
            if (colorArray[i].key == key) {
                colorArray.splice(i, 1)
            }
        }
        for (let i = 0; i < colorArray.length - 1; i++) {
            colorArray[i] = JSON.stringify(colorArray[i])
        }
        colorArray = colorArray.toString()
        colorArray = colorArray.slice(0, colorArray.length - 1)
        if (keyArray.length != 0)
            await SecureStore.setItemAsync("keys", keyArray.toString())
        else
            await SecureStore.deleteItemAsync("keys")
        if (colorArray.length != 0)
            await SecureStore.setItemAsync("colors", colorArray.toString())
        else
            await SecureStore.deleteItemAsync("colors")
        await SecureStore.deleteItemAsync(key)
    }

    async refresh() {
        let itemArray = []
        let keyArray = await SecureStore.getItemAsync("keys")
        let colorArray = await SecureStore.getItemAsync("colors")
        if (keyArray != null) {
            keyArray = keyArray.split(",")
            for (let i in keyArray) {
                itemArray.push({ key: keyArray[i], value: await SecureStore.getItemAsync(keyArray[i]) })
            }
            colorArray = colorArray.split("}")
            for (let i = 0; i < colorArray.length - 1; i++) {
                colorArray[i] = colorArray[i] + "}"
                if (colorArray[i][0] == ',' && colorArray[i][1] != '{') {
                    colorArray[i] = colorArray[i].slice(4)
                } else if (colorArray[i][0] == ',' && colorArray[i][1] == '{') {
                    colorArray[i] = colorArray[i].slice(1)
                }
                colorArray[i] = JSON.parse(colorArray[i])
            }
            let array = []
            for (let i in itemArray) {
                for (let j in colorArray) {
                    if (itemArray[i].key == colorArray[j].key) {
                        array.push(<Item data={itemArray[i]} color={colorArray[j].color} category={colorArray[j].category} id={itemArray[i].key} delete={this.deleteAlert.bind(this)} navigation={this.props.navigation} />)
                    }
                }
            }
            this.setState({ render: array })
        }
    }

    finder(text) {
        this.setState({ finder: text })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.1, backgroundColor: "#FF9800", alignItems: "center", justifyContent: "center" }}>
                    <TextInput
                        style={{ width: 350, height: 40, fontSize: 15, padding: 10, backgroundColor: "#FFC107" }}
                        defaultValue={this.state.text}
                        value={this.state.text}
                        onChangeText={(text) => this.finder(text)}
                        multiline={true} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: "wrap", backgroundColor: "#FF9800" }}>
                    {this.state.render}
                </View>
            </View>

        );
    }
}

export default Notes;
