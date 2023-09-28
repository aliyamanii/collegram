export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  bio?: string;
  profileUrl?: string;
  isPrivate: boolean;
  followers: number;
  followings: number;
}
interface UserSummery {
  id: string;
  username: string;
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
  closeFriendsOnly: boolean;
  description: string;
  likes: number;
  bookmarks: number;
  images: Image[];
  updatedAt: string;
  isLiked: true;
  isBookmarked: true;
  tags: Tag[];
}

export interface UserPost extends Post {
  user: {
    id: string;
    username: string;
  };
}

export interface MyPost extends Post {
  userId: string;
}

interface Tag {
  id?: string;
  value: string;
}

export interface PostSummery {
  id: string;
  userId: string;
  image: Image;
}

export interface UserPostSummery {
  id: string;
  closeFriendsOnly: boolean;
  likes: number;
  bookmarks: number;
  commentsNum: number;
  images: Image[];
  tags: Tag[];
  user: UserSummery;
}

export interface Image {
  id: string;
  url?: string;
  path?: string;
}
