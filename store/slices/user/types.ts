export interface IUser {
  login: string;
  id: number;
  avatar_url: string | null;
  html_url: string;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}
