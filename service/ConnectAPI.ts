import axios from 'axios';
import { RepoData } from '../types/RepoData';

export async function fetchRepo(owner: string, repo: string): Promise<RepoData> {
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const response = await axios.get(url);
    return response.data;
}
