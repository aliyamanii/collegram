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

export interface ILoginFormValues {
  usernameOrEmail: string;
  password: string;
}

export interface INewPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface IRecoverPasswordValues {
  usernameOrEmail: string;
}

export interface ISignupFormValues {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export interface Post {
  id: string;
  userId: string;
  closeFriendsOnly: boolean;
  description: string;
  likes: number;
  bookmarks: number;
  images: Image[];
  updatedAt: string;
  isLiked: true;
  isBookmarked: true;
}

export interface PostSummery {
  id: string;
  userId: string;
  image: Image;
}

export interface Image {
  id: string;
  url?: string;
  path?: string;
}
