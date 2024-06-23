import React from 'react';
import { RepoDetails } from '../types';

type UserContactInfo = Pick<RepoDetails, 'url' | 'openIssuesCount' | 'languagesUrl'>;

const RepositoryDetails: React.FC<UserContactInfo> = ({ url, openIssuesCount, languagesUrl }) => {
  return (
    <ul>
      <li>Url:{url}</li>
      <li>open issues:{openIssuesCount}</li>
      <li>programing languages:</li>
    </ul>
  );
};

export default RepositoryDetails;
