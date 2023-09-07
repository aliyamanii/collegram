export interface User {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  email: string;
  bio?: string;
  profileUrl?: string;
  isPrivate: boolean;
  followers: number;
  followings: number;
}

export interface INavLink {
  title: string;
  destinationUrl: string;
  icon: string;
}
