export interface RepoDetails {
    name: string;
    description: string | null;
    starCount: number;
    forkCount: number;
    url: string; //check type
    openIssuesCount: number; //check type
    languagesUrl: string;
}