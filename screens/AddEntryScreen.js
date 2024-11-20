import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveJournalEntry } from "../services/storages"; 
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from '../components/ImageViewer';

const AddEntryScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

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

  const PlaceholderImage = require('../assets/example.jpg');


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
      <Button title="Choose a photo" onPress={pickImageAsync} />
      <View style={styles.imageContainer}>
      <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
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
  imageContainer: {
    flex: 1,
  },
});

export default AddEntryScreen;