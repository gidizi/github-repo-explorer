//todo: consider splitting into basic and additional
export interface RepoDetails {
    name: string;
    description: string | null;
    starCount: number;
    forkCount: number;
    url: string;
    openIssuesCount: number;
    languagesUrl: string;
}