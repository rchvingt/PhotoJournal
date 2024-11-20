import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Card from "../components/Card";
import { fetchData } from "../services/api";
import { getJournalEntries } from "../services/storages";
const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const loadEntries = async () => {
        const fetchedData = await fetchData();
        const savedData = await getJournalEntries();
        console.log('savedData', savedData)
        setData([...fetchedData, ...savedData]);
    };
    useEffect(() => {
        loadEntries();
    }, []);

    // console.log('data', data);
    const clearAllData = async () => {
        try {
            await AsyncStorage.clear();
            loadEntries();
            alert("All data cleared!");
        } catch (error) {
            console.error("Error clearing AsyncStorage:", error);
            alert("Failed to clear data.");
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Add Journal Entry" onPress={() => navigation.navigate('AddEntry')}>Add Journal Entry</Button>
            <Button title="clear All Data" onPress={() => clearAllData()}>Clear Local Journal</Button>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card title={item.title} body={item.body} capture={item.capture} />
                )}
            />
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({})