import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from "../services/api"; 
import { getJournalEntries, saveJournalEntry } from "../services/storages"; // Impor fungsi 
const AddEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSaveEntry = async () => {
    try {
        const newEntry = { title, body};
        await saveJournalEntry(newEntry);
        
    Alert.alert("Success", "Entry saved!");
    setTitle('');
    setBody('');

    // Navigate back to Home screen
    navigation.replace('Home');
    } catch (error) {
      console.error("Error saving entry:", error);
      Alert.alert("Error", "Failed to save the entry.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={styles.input}
        multiline
      />
      <Button title="Save Entry" onPress={handleSaveEntry} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    padding: 10,
  },
});

export default AddEntryScreen;