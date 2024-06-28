import { RepoDTO } from "../types/DTO/GithubApi"
import { RepoDetails } from "../types/Domain"

export const mapDTOToRepoDetails = (reposDTO: RepoDTO[]): RepoDetails[] => {
    const reposDetails = reposDTO.map(repoDTO => {
        const { name, description, stargazers_count, forks_count, html_url, open_issues_count, languages_url } = repoDTO
        return {
            name,
            description,
            starCount: stargazers_count,
            forkCount: forks_count,
            url: html_url,
            openIssuesCount: open_issues_count,
            languagesUrl: languages_url
        }
    })
    return reposDetails
}