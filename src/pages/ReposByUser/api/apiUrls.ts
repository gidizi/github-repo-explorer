import { reposPerReq } from "../conf"

export const repoListApiUrlGenerator = (username: string, page: number) => `https://api.github.com/users/${username}/repos?page=${page}&per_page=${reposPerReq}`
export const userDetailsAPIUrlGenerator = (username: string) => `https://api.github.com/users/${username}`