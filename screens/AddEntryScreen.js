import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { saveJournalEntry } from "../services/storages";
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from '../components/ImageViewer';
import theme from '../theme';
import CustomButton from '../components/CustomButton';
import CustomButtonSmall from '../components/CustomButtonSmall';


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
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, padding: theme.spacing.medium, }}>
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

                <View style={styles.buttonRow}>
                    <CustomButtonSmall
                        title="Gallery"
                        onPress={() => onPressCamera('gallery')}
                        style={styles.button}
                    />
                    <CustomButtonSmall
                        title="Capture"
                        onPress={() => onPressCamera()}
                        style={styles.button}
                    />
                    {/* {capture && (
                        <CustomButtonSmall
                            title="Clear"
                            onPress={() => clearImage()}
                            style={styles.button}
                        />
                    )} */}
                </View>
                <CustomButton
                    title="Save Entry"
                    onPress={handleSaveEntry}
                    style={styles.customButton}
                /></View>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d5d7da',
        borderRadius: 5,
        marginBottom: 16,
        padding: 10,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // Spacing between buttons
        alignItems: 'center', // Align buttons vertically
        marginTop: 0,
        flex: 1
    },
    button: {
        flex: 1, // Allow buttons to evenly share available space
        marginHorizontal: 8, // Add spacing between buttons
    },
});

export default AddEntryScreen;