import React, { useState, useEffect } from 'react';
import { RepoDetails } from '../types';

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
    <ul>
      <li>Url: {url}</li>
      <li>open issues: {openIssuesCount}</li>
      <li>programing languages: {languages.join(", ")}</li>
    </ul>
  );
};

export default RepositoryDetails;
