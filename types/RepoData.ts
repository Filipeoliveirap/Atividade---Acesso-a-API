export type RepoData = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};
