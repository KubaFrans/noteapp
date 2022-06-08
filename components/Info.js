import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import Button from './Button';

class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            funkcja: null,
            title: "",
            pervTitle: "",
            value: "",
            cat: "",
            prevCat: ""
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
        this.setState({ categoryArray: array, cat: this.props.route.params.category, prevCat: this.props.route.params.category, title: this.props.route.params.key, value: this.props.route.params.value, pervTitle: this.props.route.params.key })
    }

    changeCat(param) {
        this.setState({ cat: param })
    }

    async add() {
        let keyArray = await SecureStore.getItemAsync("keys");
        let colorArray = await SecureStore.getItemAsync("colors")
        if (this.state.title != "") {
            if (this.state.value != "") {
                keyArray = keyArray.split(",")
                if (this.state.title == this.state.pervTitle) {
                    await SecureStore.setItemAsync(this.state.title, this.state.value)
                } else {
                    for (let i in keyArray) {
                        if (keyArray[i] == this.state.pervTitle) {
                            await SecureStore.deleteItemAsync(keyArray[i])
                            keyArray[i] = this.state.title
                            await SecureStore.setItemAsync("keys", keyArray.toString())
                            await SecureStore.setItemAsync(this.state.title, this.state.value)
                        }
                    }
                }
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

                if (this.state.title != this.state.pervTitle) {
                    for (let i = 0; i < colorArray.length - 1; i++) {
                        if (colorArray[i].key == this.state.pervTitle) {
                            colorArray[i].key = this.state.title
                        }
                    }
                }

                if (this.state.cat != this.state.prevCat) {
                    for (let i = 0; i < colorArray.length - 1; i++) {
                        if (colorArray[i].key == this.state.title) {
                            colorArray[i].category = this.state.cat
                        }
                    }
                }

                for (let i = 0; i < colorArray.length; i++) {
                    colorArray[i] = JSON.stringify(colorArray[i])
                    await SecureStore.setItemAsync("colors", colorArray.toString())
                }

                this.props.navigation.navigate('Notatki')

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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FF9800", flexDirection: "column" }}>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TextInput
                        style={{ width: 300, height: 60, fontSize: 30, padding: 10 }}
                        underlineColorAndroid="#ffffff"
                        placeholder="Tytuł"
                        onChangeText={(text) => this.setState({ title: text })}
                        defaultValue={this.props.route.params.key}
                    />
                </View>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TextInput
                        style={{ width: 350, height: 60, fontSize: 30, padding: 10 }}
                        underlineColorAndroid="#ffffff"
                        placeholder="Treść"
                        onChangeText={(text) => this.setState({ value: text })}
                        defaultValue={this.props.route.params.value}
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
                    <Button function={this.add.bind(this)} text="UAKTUALNIJ NOTATKĘ" />
                </View>

            </View>
        );
    }
}

export default Info;
