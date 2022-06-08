import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        return (
            <TouchableOpacity style={{ width: 118, height: 118, backgroundColor: this.props.color, margin: 5, padding: 5, borderRadius: 10 }} onLongPress={() => this.props.delete(this.props.id, this.props.data.key)} onPress={() => this.props.navigation.navigate('Informacje', { key: this.props.data.key, category: this.props.category, value: this.props.data.value })}>
                <View style={{ backgroundColor: "#F57C00", flex: 1, marginLeft: 10, padding: 2, borderRadius: 5 }}><Text style={{ fontSize: 30, textAlign: "center" }}>{this.props.category}</Text></View>
                <Text style={{ fontSize: 32 }}>{this.props.data.key}</Text>
                <Text style={{ fontSize: 15 }}>{this.props.data.value}</Text>
            </TouchableOpacity>
        );
    }
}

export default Item;
