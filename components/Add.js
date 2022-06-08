import React, { Component } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import Button from './Button';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            funkcja: null,
            title: "",
            value: "",
            color: ["#B5DFF5", "#DBA581", "#F55752", "#F5BE73"],
            cat: "a",
            categoryArray: []
        };
    }

    componentDidMount = () => {
        this.state.funkcja = this.props.navigation.addListener('focus', () => {
            this.getCategories()
        });
        this.getCategories()

    }
    componentWillUnmount() {
        this.state.funkcja;
    }

    async getCategories() {
        let categoryArray = await SecureStore.getItemAsync("categories");
        let array = []
        if (this.state.category != "") {
            categoryArray = categoryArray.split(",")
            for (let i in categoryArray) {
                array.push(<Picker.Item label={categoryArray[i]} value={categoryArray[i]} />)
            }
        }
        this.setState({ categoryArray: array, cat: categoryArray[0] })
    }

    async add() {
        let keyArray = await SecureStore.getItemAsync("keys");
        let colorArray = await SecureStore.getItemAsync("colors")
        if (this.state.title != "") {
            if (this.state.value != "") {
                if (keyArray == null) {
                    let newArray = []
                    newArray.push(this.state.title)
                    await SecureStore.setItemAsync("keys", newArray.toString())
                    await SecureStore.setItemAsync(this.state.title, this.state.value)
                } else {
                    let test = true
                    keyArray = keyArray.split(",")
                    for (let i in keyArray) {
                        if (keyArray[i] == this.state.title)
                            test = false
                    }
                    if (test)
                        keyArray.push(this.state.title)
                    await SecureStore.setItemAsync("keys", keyArray.toString())
                    await SecureStore.setItemAsync(this.state.title, this.state.value)
                }

                if (colorArray == null) {
                    let newArray = []
                    let x = { key: this.state.title, color: this.state.color[Math.floor(Math.random() * 4)], category: this.state.cat }
                    newArray.push(JSON.stringify(x))
                    await SecureStore.setItemAsync("colors", newArray.toString())
                    this.props.navigation.navigate('Notatki')
                } else {
                    let test = true
                    colorArray = colorArray.split("}")
                    for (let i = 0; i < colorArray.length - 1; i++) {
                        colorArray[i] = colorArray[i] + "}"
                        if (colorArray[i][0] == "," && colorArray[i][1] != '"') {
                            colorArray[i] = colorArray[i].slice(1)
                        } else if (colorArray[i][0] == "," && colorArray[i][1] == '"') {
                            colorArray[i] = colorArray[i].slice(4)
                        }
                        colorArray[i] = JSON.parse(colorArray[i])
                    }
                    for (let i = 0; i < colorArray.length - 1; i++) {
                        if (colorArray[i].key == this.state.title) {
                            test = false
                        }
                    }
                    if (test) {
                        let x = { key: this.state.title, color: this.state.color[Math.floor(Math.random() * 4)], category: this.state.cat }
                        colorArray.push(x)
                        for (let i = 0; i < colorArray.length; i++) {
                            colorArray[i] = JSON.stringify(colorArray[i])
                            await SecureStore.setItemAsync("colors", colorArray.toString())
                        }
                    } else {
                        for (let i = 0; i < colorArray.length; i++) {
                            colorArray[i] = JSON.stringify(colorArray[i])
                        }
                    }

                    this.props.navigation.navigate('Notatki')
                }
            } else {
                Alert.alert(
                    "Brak zawartości",
                    "Dodaj zawartość",
                    [
                        { text: "OK" }
                    ])
            }
        } else {
            Alert.alert(
                "Brak tytułu",
                "Dodaj tytuł notatki",
                [
                    { text: "OK" }
                ])
        }
    }

    changeCat(param) {
        this.setState({ cat: param })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FF9800", flexDirection: "column" }}>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TextInput
                        style={{ width: 300, height: 60, fontSize: 30, padding: 10 }}
                        underlineColorAndroid="#ffffff"
                        placeholder="Tytuł"
                        onChangeText={(text) => this.setState({ title: text })}
                    />
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TextInput
                        style={{ width: 350, height: 60, fontSize: 30, padding: 10 }}
                        underlineColorAndroid="#ffffff"
                        placeholder="Treść"
                        onChangeText={(text) => this.setState({ value: text })}
                    />
                </View>
                <View style={{ flex: 0.5, alignItems: "center" }}>
                    <Picker
                        style={{ width: 300, height: 50, backgroundColor: "#FFC107", border: "solid", borderColor: "#F57C00", borderWidth: 2 }}
                        selectedValue={this.state.cat}
                        onValueChange={this.changeCat.bind(this)}>
                        {this.state.categoryArray}

                    </Picker>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Button function={this.add.bind(this)} text="DODAJ NOTATKĘ" />
                </View>

            </View>
        );
    }
}

export default Add;
