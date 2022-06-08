import React, { Component } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Button from './Button';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: ""
        };
    }

    async add() {
        let categoryArray = await SecureStore.getItemAsync("categories");
        if (this.state.category != "") {
            if (categoryArray == null) {
                let newArray = []
                newArray.push(this.state.category)
                await SecureStore.setItemAsync("categories", newArray.toString())
            } else {
                let test = true
                categoryArray = categoryArray.split(",")
                for (let i in categoryArray) {
                    if (categoryArray[i] == this.state.category)
                        test = false
                }
                if (test)
                    categoryArray.push(this.state.category)
                await SecureStore.setItemAsync("categories", categoryArray.toString())
            }
        } else {
            Alert.alert(
                "Brak zawartości",
                "Dodaj zawartość",
                [
                    { text: "OK" }
                ])
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: "#FF9800" }}>
                <View style={{ flex: 0.2, alignItems: "center" }}>
                    <TextInput
                        style={{ width: 300, height: 60, fontSize: 30, padding: 10 }}
                        underlineColorAndroid="#ffffff"
                        placeholder="Nazwa kategorii"
                        onChangeText={(text) => this.setState({ category: text })}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Button function={this.add.bind(this)} text="DODAJ KATEGORIĘ" />
                </View>
            </View>
        );
    }
}

export default AddCategory;
