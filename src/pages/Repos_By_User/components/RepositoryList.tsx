import React from 'react';
import { RepoDetails } from '../types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RepositoryDetails from './RepositoryDetails';
import RepositorySummary from './RepositorySummary';

interface RepositoryListProps {
    reposData: RepoDetails[];
}

const RepositoryList: React.FC<RepositoryListProps> = ({ reposData }) => {
    return (
        <>
            {reposData.map(repoData => (<Accordion><AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <RepositorySummary name={repoData.name} description={repoData.description} starCount={repoData.starCount} forkCount={repoData.forkCount} />
            </AccordionSummary>
                <AccordionDetails>
                    <RepositoryDetails url={repoData.url} openIssuesCount={repoData.openIssuesCount} languagesUrl={repoData.languagesUrl} />
                </AccordionDetails></Accordion >))}
        </>
    );
};

export default RepositoryList;