import AsyncStorage from '@react-native-async-storage/async-storage';
import { RepoData } from '../types/RepoData';

const KEY = 'REPO';

export async function saveRepos(repos: RepoData[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(repos));
}
    
export async function loadRepos(): Promise<RepoData[]> {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
}

export async function clearRepos() {
    await AsyncStorage.removeItem(KEY);
}