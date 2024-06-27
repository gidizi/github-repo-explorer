import React from 'react';
import { RepoDetails } from '../types';
import StarIcon from '@mui/icons-material/Star';
import CallSplit from '@mui/icons-material/ForkRight';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

type RepoAdditionalDetails = Pick<RepoDetails, 'name' | 'description' | 'starCount' | 'forkCount'>;


const RepositorySummary: React.FC<RepoAdditionalDetails> = ({ name, description, starCount, forkCount }) => {
    return (
        <List>
            <ListItem><ListItemText primary={<>Name {name}</>}></ListItemText></ListItem >
            <ListItem><ListItemText primary={<>Description {description}</>}></ListItemText></ListItem >
            <ListItem><ListItemText primary={<>Star Count {starCount}</>}></ListItemText><ListItemIcon>
                <StarIcon />
            </ListItemIcon></ListItem >
            <ListItem><ListItemText primary={<>Fork Count {forkCount}</>}></ListItemText>
                <ListItemIcon>
                    <CallSplit />
                </ListItemIcon></ListItem >

        </List >
    );
};

export default RepositorySummary;