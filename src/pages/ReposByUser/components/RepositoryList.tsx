import React from 'react';
import { RepoDetails } from '../types/Domain';
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
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <>
            {reposData.map(repoData => {
                const panelId = `panel-${repoData.name}`;
                const isCurrItemExpanded = expanded === panelId
                return (
                    <Accordion
                        key={repoData.name}
                        expanded={isCurrItemExpanded}
                        onChange={handleChange(panelId)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}>
                            <RepositorySummary name={repoData.name} description={repoData.description} starCount={repoData.starCount} forkCount={repoData.forkCount} />
                        </AccordionSummary>
                        {isCurrItemExpanded && <AccordionDetails>
                            <RepositoryDetails url={repoData.url} openIssuesCount={repoData.openIssuesCount} languagesUrl={repoData.languagesUrl} />
                        </AccordionDetails>}</Accordion >)
            })}
        </>
    );
};

export default RepositoryList;