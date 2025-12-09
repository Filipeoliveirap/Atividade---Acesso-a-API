import { RepoData } from "../types/RepoData";
import { fetchRepo } from "../service/ConnectAPI";
import { loadRepos, saveRepos, clearRepos } from "../storage/RepoStorage";
import { useEffect, useState } from "react";

export function useRepos() {
    const [repos, setRepos] = useState([] as RepoData[]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRepos().then((data) => {
            setRepos(data);
            setLoading(false);
        });
    }, []);

    async function addRepo(owner:string, repo: string) {
        const newRepo = await fetchRepo(owner,  repo);
        
        const updated = [...repos, newRepo];
        setRepos(updated);
        await saveRepos(updated);
    }

    async function clearAll() {
        await clearRepos();
        setRepos([]);
    }

    return { repos, loading, addRepo, clearAll };
}