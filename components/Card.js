import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import theme from '../theme';
const Card = ({ title, body, capture }) => {
    const snippetLength = 80; // Limit for the snippet length
    const snippet = body.length > snippetLength ? `${body.substring(0, snippetLength)}...` : body;

    return (

        <View style={styles.card}>
            {/* Image Section */}
            <View style={styles.imageContainer}>
                {capture ?
                    <Image
                        source={{ uri: capture }}
                        style={styles.image}
                        resizeMode="cover"
                    /> : <Image source={require('../assets/placeholder.png')} style={styles.image} />
                }
            </View>

            {/* Text Section */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{snippet}</Text>
            </View>
        </View>
    );
}

export default Card

const styles = StyleSheet.create({

    card: {
        flexDirection: 'row', // Row layout
        alignItems: 'center',
        backgroundColor: theme.colors.cardBackground,
        // borderRadius: theme.borderRadius.normal,
        padding: theme.spacing.small,
        marginBottom: theme.spacing.small,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 3,
        borderRadius: 4,
        backgroundColor: '#FAFAFA'
    },


    title: {
        fontSize: theme.fontSizes.normal, // Smaller font size
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.small,
        textTransform: 'capitalize'
    },
    body: {
        fontSize: theme.fontSizes.small, // Smaller font size
        color: theme.colors.textSecondary,
    },
    textContainer: {
        flex: 1,
        marginRight: theme.spacing.medium, // Take the remaining space


    },
    image: {
        width: 30, // Thumbnail size
        height: 30,
        borderRadius: 2,
        // marginRight: theme.spacing.medium,
    },

    imageContainer: {
        // backgroundColor: '#FCFAFF',
        height: 35,
        width: 35,
        borderRad5ius: theme.borderRadius.normal,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.small
    }
});
