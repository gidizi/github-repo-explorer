import React from 'react';
import { RepoDetails } from '../types';
import StarIcon from '@mui/icons-material/Star';
import CallSplit from '@mui/icons-material/ForkRight';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

type RepoAdditionalDetails = Pick<RepoDetails, 'name' | 'description' | 'starCount' | 'forkCount'>;


const RepositorySummary: React.FC<RepoAdditionalDetails> = ({ name, description, starCount, forkCount }) => {
    return (
        <List>
            <ListItem>
                <div style={{ paddingRight: '8px' }}>Name {name}</div>
            </ListItem>
            <ListItem>
                <div style={{ paddingRight: '8px' }}>Description {description}</div>
            </ListItem>
            <ListItem>
                <div style={{ paddingRight: '8px' }}>tar Count {starCount}</div>
                <StarIcon />
            </ListItem>
            <ListItem>
                <div style={{ paddingRight: '8px' }}>ork Count {forkCount}</div>
                <CallSplit />
            </ListItem>
        </List >
    );
};

export default RepositorySummary;