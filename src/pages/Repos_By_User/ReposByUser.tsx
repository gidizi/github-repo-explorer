import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RepoDetails } from './types';
import RepositoryDetails from './components/RepositoryDetails';

const repoListApiUrlGenerator = (username: string) => `https://api.github.com/users/${username}/repos`
const userDetailsAPIUrlGenerator = (username: string) => `https://api.github.com/users/${username}`


//todo: extract components of head an extra details
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

//todo: take care of pagination
const ReposByUser: React.FC<any> = () => {
    const [username, setUsername] = useState("")
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reposData, setReposData] = useState<RepoDetails[]>([])
    const [publicRepoNum, setPublicRepoNum] = useState<number | null>(null)

    async function getReposData(githubUser: string) {
        const repoListProm = fetch(repoListApiUrlGenerator(githubUser), {
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
            if (repoLisetRes.status !== 200) {
                setError((repoListData as FailedGitlabResponse).message)
                return
            }
            if (userDetailsRes.status !== 200) {
                setError((repoListData as FailedGitlabResponse).message) //notice: this will override the previous error if both appears. its an architectural decision
                return
            }
        }
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setReposData([])
        setIsSubmitting(true)
        try {
            getReposData(username)
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
            {publicRepoNum}
            {
                reposData.map(repoData => (<Accordion><AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <React.Fragment>name:{repoData.name}<br />
                        description:{repoData.description}<br />
                        star:{repoData.starCount}<br />
                        fork:{repoData.forkCount}<br />
                    </React.Fragment>
                </AccordionSummary>
                    <AccordionDetails>
                        <RepositoryDetails url={repoData.url} openIssuesCount={repoData.openIssuesCount} languagesUrl={repoData.languagesUrl} />
                    </AccordionDetails></Accordion >))
            }

        </div >
    );
};

export default ReposByUser;
