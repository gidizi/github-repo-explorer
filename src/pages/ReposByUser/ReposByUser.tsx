import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RepoDetails, } from './types/Domain';
import { TextField, Button, Stack, Typography, Pagination, Container, Box } from '@mui/material';
import { FailedGithubResponse, RepoDTO, UserDetailsDTO } from './types/DTO/GithubApi';
import { repoListApiUrlGenerator, userDetailsAPIUrlGenerator } from './api/apiUrls'
import { mapDTOToRepoDetails } from "./mappers/mappers"
import { reposPerReq } from './conf';
import RepositoryList from './components/RepositoryList';


const ReposByUser: React.FC<{}> = () => {
    const [username, setUsername] = useState("")
    const [reposData, setReposData] = useState<RepoDetails[]>([])
    const [publicRepoNum, setPublicRepoNum] = useState<number | null>(null)

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [page, setPage] = React.useState(1);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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
        <Container maxWidth="md" style={{ padding: '20px' }}>
            <Box textAlign="center">
                <Typography variant="h4" component="h1">
                    GitHub Repository Explorer
                </Typography>
                <Typography variant="h6" component="p">
                    Enter a GitHub username to get details of their repositories.
                </Typography>
            </Box>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <TextField
                    label="GitHub Username"
                    variant="outlined"
                    value={username}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={username.length === 0 || isSubmitting}
                    fullWidth
                >
                    Submit
                </Button>
            </form>

            {error && <Typography color="error">An error has occurred: {error}</Typography>}

            <RepositoryList reposData={reposData} />

            {publicRepoNum && (
                <Stack spacing={2} alignItems="center" style={{ marginTop: '20px' }}>
                    <Pagination
                        count={Math.ceil(publicRepoNum / reposPerReq)}
                        page={page}
                        onChange={handlePageChange}
                    />
                </Stack>
            )}
        </Container>
    );
};

export default ReposByUser;
