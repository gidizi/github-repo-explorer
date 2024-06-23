import React, { useState, useEffect } from 'react';

const GithubApiUrl = `https://api.github.com/users/gidizi/repos`

//todo: consider splitting into basic and additional
interface RepoDetails {
    name: string;
    description: string;
    starCount: number;
    forkCount: number;
    url: string; //check type
    openIssuesCount: number; //check type
    languages: string[];
}

const ReposByUser: React.FC<any> = () => {
    const [username, setUsername] = useState(null) //todo: make it sync to input with the proper type
    const [reposData, setReposData] = useState([])

    async function getReposData() {
        //add the special header
        const res = await fetch(GithubApiUrl, {
            headers: {
                "Accept": "application/vnd.github+json",
            },
        })
        console.log("res", res)
        const listReposForUser = await res.json() as RepoDetails[]
        console.log(listReposForUser)

        //add error handling
    }

    useEffect(() => {
        getReposData()

    }, [])

    return (
        <button
            onClick={() => { }}
        >
            get repositories
        </button>
    );
};

export default ReposByUser;
