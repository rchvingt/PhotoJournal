import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

const CustomButtonSmall = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButtonSmall;

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.background, // White background
        borderColor: '#D6D7DA',  // Outline border with primary color
        borderWidth: 1,
        borderRadius: theme.borderRadius.normal,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.small,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#414651', // Primary color for text
        fontSize: theme.fontSizes.small,
        fontWeight: '600',
    },
});