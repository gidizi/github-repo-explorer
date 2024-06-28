import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RepoDetails, } from '../../types/Domain';
import { FailedGithubResponse, RepoDTO, UserDetailsDTO } from '../../types/DTO/GithubApi';
import { repoListApiUrlGenerator, userDetailsAPIUrlGenerator } from './api/apiUrls'
import { mapDTOToRepoDetails } from "./mappers/mappers"
import { reposPerReq } from './conf';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import RepositoryList from './components/RepositoryList';

const tempToken = 'temp'

//todo: improve visual display
const ReposByUser: React.FC<{}> = () => {
    const [username, setUsername] = useState("")
    const [reposData, setReposData] = useState<RepoDetails[]>([])
    const [publicRepoNum, setPublicRepoNum] = useState<number | null>(null)

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [page, setPage] = React.useState(1);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        getReposData(username, value) //note: there could be a dedicated function here that only calls the repos api, for the scope of the project we will stick with that function
        setPage(value);
    };


    async function getReposData(githubUser: string, resPage: number) {
        const repoListProm = fetch(repoListApiUrlGenerator(githubUser, resPage), {
            headers: {
                "Accept": "application/vnd.github+json",
                'Authorization': `token ${tempToken}`,
                'Content-Type': 'application/json'
            },
        })
        const userDetailsProm = await fetch(userDetailsAPIUrlGenerator(githubUser), {
            headers: {
                "Accept": "application/vnd.github+json",
                'Authorization': `token ${tempToken}`,
                'Content-Type': 'application/json'
            },
        })

        const [repoLisetRes, userDetailsRes] = await Promise.all([repoListProm, userDetailsProm])
        const [repoListData, userDetailsData] = await Promise.all([repoLisetRes.json(), userDetailsRes.json()]);

        if (repoLisetRes.status === 200 && userDetailsRes.status === 200) {
            const reposDetails = mapDTOToRepoDetails(repoListData as RepoDTO[])
            setReposData(reposDetails)
            setPublicRepoNum((userDetailsData as UserDetailsDTO).public_repos)
        } else {
            setReposData([])
            setPublicRepoNum(null)
            if (repoLisetRes.status !== 200) {
                setError((repoListData as FailedGithubResponse).message)
            }
            if (userDetailsRes.status !== 200) {
                setError((repoListData as FailedGithubResponse).message) //notice: this will override the previous error if both appears. its an architectural decision
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
                <Pagination count={Math.ceil(publicRepoNum / reposPerReq)} page={page} onChange={handleChange} />
            </Stack>)}

        </div >
    );
};

export default ReposByUser;
