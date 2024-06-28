import React from 'react';
import Typography from '@mui/material/Typography';
import { RepoDetails } from '../types/Domain';
import StarIcon from '@mui/icons-material/Star';
import CallSplit from '@mui/icons-material/ForkRight';
import { List, ListItem } from '@mui/material';

type RepoAdditionalDetails = Pick<RepoDetails, 'name' | 'description' | 'starCount' | 'forkCount'>;


const RepositorySummary: React.FC<RepoAdditionalDetails> = ({ name, description, starCount, forkCount }) => {
    return (
        <List>
            <ListItem>
                <Typography style={{ paddingRight: '8px' }}>Name: {name}</Typography>
            </ListItem>
            <ListItem>
                <Typography style={{ paddingRight: '8px' }}>Description: {description}</Typography>
            </ListItem>
            <ListItem>
                <Typography style={{ paddingRight: '8px' }}>Star Count: {starCount}</Typography>
                <StarIcon />
            </ListItem>
            <ListItem>
                <Typography style={{ paddingRight: '8px' }}>Fork Count: {forkCount}</Typography>
                <CallSplit />
            </ListItem>
        </List>
    );
};

export default RepositorySummary;