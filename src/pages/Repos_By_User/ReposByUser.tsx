import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RepoDetails } from './types';
import RepositoryDetails from './components/RepositoryDetails';

const GithubApiUrl = `https://api.github.com/users/gidizi/repos`

//todo: consider splitting into basic and additional


//todo: another api call to get languages
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
    const [username, setUsername] = useState(null) //todo: make it sync to input with the proper type
    const [reposData, setReposData] = useState<RepoDetails[]>([])

    async function getReposData() {
        const res = await fetch(GithubApiUrl, {
            headers: {
                "Accept": "application/vnd.github+json",
            },
        })
        const listReposForUser = await res.json() as RepoDTO[]
        const reposDetails = mapDTOToRepoDetails(listReposForUser)
        setReposData(reposDetails)

        //add error handling
    }

    useEffect(() => {
        getReposData()
    }, [])
    return (
        <div>
            {reposData.map(repoData => (<Accordion><AccordionSummary
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
            < button
                onClick={() => { }}
            >
                get repositories
            </button >
        </div >
    );
};

export default ReposByUser;
