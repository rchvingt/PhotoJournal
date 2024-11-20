import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from "../services/api";
// Save entry journal to AsyncStorage
export const saveJournalEntry = async (entry) => {
    try {

        const fetchedData = await fetchData();
        const existingEntries = await AsyncStorage.getItem('journalEntries');
        const entries = existingEntries ? JSON.parse(existingEntries) : [];

        const allEntries = [...fetchedData, ...entries];
        const maxId = allEntries.length > 0 ? Math.max(...allEntries.map(entry => entry.id)) : 0;
        const nextId = maxId + 1;

        const newEntry = {
            id: nextId,
            userId: 1, // Fixed userId as per requirements
            title: entry.title,
            body: entry.description,
            capture: entry.capture
        };

        const updatedEntries = [...entries, newEntry];
        // console.log('updatedEntries', updatedEntries);
        await AsyncStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    } catch (error) {
        console.error("Error saving entry:", error);
        throw error;
    }
};

// Get entry journal from AsyncStorage
export const getJournalEntries = async () => {
    try {
        const entries = await AsyncStorage.getItem('journalEntries');
        return entries ? JSON.parse(entries) : [];
    } catch (error) {
        console.error("Error getting entries:", error);
        return [];
    }
};