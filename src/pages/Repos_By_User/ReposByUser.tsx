import React, { useState, ChangeEvent, FormEvent } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RepoDetails } from './types';
import RepositoryDetails from './components/RepositoryDetails';

const GithubApiUrlGenerator = (username: string) => `https://api.github.com/users/${username}/repos`

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

    async function getReposData(githubUser: string) {
        const res = await fetch(GithubApiUrlGenerator(githubUser), {
            headers: {
                "Accept": "application/vnd.github+json",
            },
        })
        console.log("res", res)
        if (res.status === 200) {
            const listReposForUser = await res.json() as RepoDTO[]
            const reposDetails = mapDTOToRepoDetails(listReposForUser)
            setReposData(reposDetails)
        } else {
            const parsedErrResponse = await res.json() as FailedGitlabResponse
            const errorMessage = parsedErrResponse.message ? parsedErrResponse.message : "Unknown error has occured"
            setError(errorMessage)
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

            {error}
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
