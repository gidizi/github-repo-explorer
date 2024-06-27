import React, { useState, useEffect } from 'react';
import { RepoDetails } from '../types';
import { List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AdjustIcon from '@mui/icons-material/Adjust';
import LinkIcon from '@mui/icons-material/Link';

type RepoAdditionalDetails = Pick<RepoDetails, 'url' | 'openIssuesCount' | 'languagesUrl'>;


const RepositoryDetails: React.FC<RepoAdditionalDetails> = ({ url, openIssuesCount, languagesUrl }) => {
  const [languages, setLanguages] = useState<string[]>([])

  async function getLanguages(languagesUrl: RepoAdditionalDetails['languagesUrl']) {
    const res = await fetch(languagesUrl)
    const languageData = await res.json()
    setLanguages(Object.keys(languageData))
    //todo: add error handling
  }

  useEffect(() => {
    getLanguages(languagesUrl)
  }, [languagesUrl])

  return (
    <List>
      <ListItem>
        <div style={{ paddingRight: '8px' }}>Url: {url}</div>
        <LinkIcon />
      </ListItem>
      <ListItem>
        <div style={{ paddingRight: '8px' }}>Open issues: {openIssuesCount}</div>
        <AdjustIcon />
      </ListItem>
      <ListItem>
        <div style={{ paddingRight: '8px' }}>Programing languages: {languages.join(", ")}</div>
        <LanguageIcon />
      </ListItem>
    </List>
  );
};

export default RepositoryDetails;
