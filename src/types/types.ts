export interface User {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  profileUrl: string;
  isPrivate: boolean;
  followers: number;
  following: number;
}

export interface INavLink {
  title: string;
  destinationUrl: string;
  icon: string;
}
