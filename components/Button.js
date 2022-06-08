import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} onPress={this.props.function}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

Button.propTypes = {
    function: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#F57C00",
        borderRadius: 5,
        width: 280,
        height: 51,
        padding: 5,
    },
    text: {
        fontSize: 30,
        textAlign: "center",
        color: "#212121",
        opacity: 0.7
    }
})
