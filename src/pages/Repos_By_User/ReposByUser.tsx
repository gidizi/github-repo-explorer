import React, { useState, ChangeEvent } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RepoDetails } from './types';
import RepositoryDetails from './components/RepositoryDetails';

const GithubApiUrlGenerator = (username: string) => `https://api.github.com/users/${username}/repos`

//todo: consider splitting into basic and additional

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
    const [reposData, setReposData] = useState<RepoDetails[]>([])

    async function getReposData() {
        const res = await fetch(GithubApiUrlGenerator(username), {
            headers: {
                "Accept": "application/vnd.github+json",
            },
        })
        const listReposForUser = await res.json() as RepoDTO[]
        const reposDetails = mapDTOToRepoDetails(listReposForUser)
        setReposData(reposDetails)

        //add error handling
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value);
    }


    return (
        <div>
            {/* <form> */}
            <input type='text' value={username} onChange={handleInputChange} />
            < button
                onClick={() => { getReposData() }}
            >
                get repositories
            </button >
            {/* // </form> */}
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
