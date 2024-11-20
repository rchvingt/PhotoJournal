import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { saveJournalEntry } from "../services/storages";
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from '../components/ImageViewer';


const AddEntryScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [capture, setCapture] = useState();

    const PlaceholderImage = require('../assets/placeholder.png');

    const handleSaveEntry = async () => {
        try {
            const newEntry = { title, description, capture };
            await saveJournalEntry(newEntry);

            Alert.alert("Success", "Entry saved!");
            setTitle('');
            setDescription('');

            // Navigate back to Home screen
            navigation.replace('Home');
        } catch (error) {
            console.error("Error saving entry:", error);
            Alert.alert("Error", "Failed to save the entry.");
        }
    };

    const onPressCamera = async (mode) => {
        try {
            let result = {};
            if (mode === 'gallery') {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images', 'videos'],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }

            if (!result.canceled) {
                // save the image
                await saveCaptureImage(result.assets[0].uri);
            }
        } catch (error) {
            alert('Error save image: ' + error.message);
        }
    }

    const saveCaptureImage = async (capture) => {
        try {
            setCapture(capture);
        } catch (error) {
            throw error
        }
    }

    const clearImage = async () => {
        try {
            saveCaptureImage(null)
        } catch ({ message }) {
            alert(message)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { height: 100 }]}
                multiline
                numberOfLines={5}
            />

            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage ? selectedImage : capture} />
            </View>

            {
                capture && <Button title="Clear Photo" onPress={() => clearImage()} />
            }

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                <Button title="Choose a photo" onPress={() => onPressCamera('gallery')} />
                <Button title="Capture a photo" onPress={() => onPressCamera()} />
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