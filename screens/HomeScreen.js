import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@react-navigation/elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from "../theme";
import Card from "../components/Card";
import { fetchData } from "../services/api";
import { getJournalEntries } from "../services/storages";
const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const loadEntries = async () => {
        const fetchedData = await fetchData();
        const savedData = await getJournalEntries();
        // console.log('savedData', savedData)
        setData([...fetchedData, ...savedData]);
    };

    useEffect(() => {
        loadEntries();
    }, []);

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
        <SafeAreaView style={styles.container}>
            {/* <Button title="clear All Data" onPress={() => clearAllData()}>Clear Local Journal</Button> */}
            <FlatList
                showsVerticalScrollIndicator={false} vertical
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card title={item.title} body={item.body} capture={item.capture} />
                )}
                contentContainerStyle={styles.listContent}
            // ItemSeparatorComponent={() => (
            //     <View style={{ backgroundColor: "#E1E2E4", height: 0.4 }} />
            // )}

            />
            {/* Floating button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddEntry')}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    listContent: {
        padding: theme.spacing.medium,
    },
    floatingButton: {
        position: 'absolute',
        bottom: theme.spacing.large,
        right: theme.spacing.large,
        backgroundColor: theme.colors.primary,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    floatingButtonText: {
        color: '#FFF',
        fontSize: theme.fontSizes.large,
        fontWeight: 'bold',
    },
})