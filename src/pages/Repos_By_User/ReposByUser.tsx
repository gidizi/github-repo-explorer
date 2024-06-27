import React, { useState, ChangeEvent, FormEvent } from 'react';

import { RepoDetails } from './types';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const resultsPerPage = 30

const repoListApiUrlGenerator = (username: string, page: number) => `https://api.github.com/users/${username}/repos?page=${page}&per_page=${resultsPerPage}`
const userDetailsAPIUrlGenerator = (username: string) => `https://api.github.com/users/${username}`


//todo: improve visual display
//todo: consider making conversion table of popular github errors
//todo: organize interfaces and utils
interface RepoDTO {
    name: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    open_issues_count: number;
    languages_url: string;
    [key: string]: any;
}

interface UserDetails {
    public_repos: number;
    [key: string]: any;
}

interface FailedGitlabResponse {
    documentation_url: string;
    message: string;
    status: string;
}

const mapDTOToRepoDetails = (reposDTO: RepoDTO[]): RepoDetails[] => {
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

const ReposByUser: React.FC<any> = () => {
    const [username, setUsername] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reposData, setReposData] = useState<RepoDetails[]>([])
    const [publicRepoNum, setPublicRepoNum] = useState<number | null>(null)

    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        getReposData(username, value) //note: there could be a dedicated function here that only calls the repos api, for the scope of the project we will stick with that function
        setPage(value);
    };


    async function getReposData(githubUser: string, resPage: number) {
        const repoListProm = fetch(repoListApiUrlGenerator(githubUser, resPage), {
            headers: {
                "Accept": "application/vnd.github+json",
            },
        })
        const userDetailsProm = await fetch(userDetailsAPIUrlGenerator(githubUser), {
            headers: {
                "Accept": "application/vnd.github+json",
            },
        })

        const [repoLisetRes, userDetailsRes] = await Promise.all([repoListProm, userDetailsProm])
        const [repoListData, userDetailsData] = await Promise.all([repoLisetRes.json(), userDetailsRes.json()]);

        if (repoLisetRes.status === 200 && userDetailsRes.status === 200) {
            const reposDetails = mapDTOToRepoDetails(repoListData as RepoDTO[])
            setReposData(reposDetails)
            setPublicRepoNum((userDetailsData as UserDetails).public_repos)
        } else {
            setReposData([])
            setPublicRepoNum(null)
            if (repoLisetRes.status !== 200) {
                setError((repoListData as FailedGitlabResponse).message)
            }
            if (userDetailsRes.status !== 200) {
                setError((repoListData as FailedGitlabResponse).message) //notice: this will override the previous error if both appears. its an architectural decision
            }
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setReposData([])
        setIsSubmitting(true)
        try {
            const initialPageNum = 1
            getReposData(username, initialPageNum)
            setIsSubmitting(false)
        } catch (error) {
            // setError(error)
            setIsSubmitting(false)
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
        setError(null)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={handleInputChange} /><br />
                < button disabled={username.length === 0 || isSubmitting}>
                    submit
                </button >
            </form>

            {error && `an error has occured: ${error}`}
            <RepositoryList reposData={reposData} />


            {publicRepoNum && (<Stack spacing={2}>
                <Pagination count={Math.ceil(publicRepoNum / resultsPerPage)} page={page} onChange={handleChange} />
            </Stack>)}

        </div >
    );
};

export default ReposByUser;
