import React, { useState, useEffect } from 'react';
import { RepoDetails } from '../../../types/Domain';
import { List, ListItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AdjustIcon from '@mui/icons-material/Adjust';
import LinkIcon from '@mui/icons-material/Link';
import Typography from '@mui/material/Typography';


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
        <Typography style={{ paddingRight: '8px' }}>Url: {url}</Typography>
        <LinkIcon />
      </ListItem>
      <ListItem>
        <Typography style={{ paddingRight: '8px' }}>Open issues: {openIssuesCount}</Typography>
        <AdjustIcon />
      </ListItem>
      <ListItem>
        <Typography style={{ paddingRight: '8px' }}>Programming languages: {languages.join(", ")}</Typography>
        <LanguageIcon />
      </ListItem>
    </List>
  );
};

export default RepositoryDetails;
