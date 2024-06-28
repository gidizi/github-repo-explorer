export interface RepoDTO {
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    open_issues_count: number;
    languages_url: string;
    [key: string]: any;
}

export interface UserDetailsDTO {
    public_repos: number;
    [key: string]: any;
}

export interface FailedGithubResponse {
    documentation_url: string;
    message: string;
    status: string;
}
