import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from "expo-image";

const ImageViewer = ({imgSource, selectedImage }) => {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={styles.image} />;
  
  
}

export default ImageViewer
const styles = StyleSheet.create({
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });