import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Card = ({ title, body }) => {
    return (
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
      );
}

export default Card

const styles = StyleSheet.create({
    card: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    body: {
      fontSize: 14,
      color: "#555",
    },
  });
