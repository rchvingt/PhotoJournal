import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

const CustomButton = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary, // White background
        borderColor: theme.colors.primary,  // Outline border with primary color
        borderWidth: 1,
        borderRadius: theme.borderRadius.normal,
        paddingVertical: theme.spacing.small,
        paddingHorizontal: theme.spacing.large,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: theme.colors.background, // Primary color for text
        fontSize: theme.fontSizes.medium,
        fontWeight: '600',
    },
});