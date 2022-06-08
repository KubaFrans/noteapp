import React, { Component } from 'react';
import { View, Text } from 'react-native';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FF9800", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#FFFFFF", fontSize: 100, textAlign: "center" }}> Jakub Francuz 4ia1 </Text>
            </View>
        );
    }
}

export default About;
