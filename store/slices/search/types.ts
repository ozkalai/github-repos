export interface IRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url?: string;
    gravatar_id: string;
    url?: string;
    type: string;
    html_url: string;
    site_admin: boolean;
  };
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  master_branch: string;
  default_branch: string;
  score: number;
  forks: number;
  open_issues: number;
  watchers: number;
  has_issues: boolean;
  has_projects: boolean;
  has_pages: boolean;
  has_wiki: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility: string;
  license: {
    key: string;
    name: string;
    url: string;
    spdx_id: string;
    node_id: string;
    html_url: string;
  };
}

export interface IRepositories {
  total_count: number;
  incomplete_results: boolean;
  items: IRepository[];
}
