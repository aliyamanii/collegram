export interface UserMeInfo {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  bio?: string;
  profileUrl?: string;
  isPrivate: boolean;
  followers: number;
  followings: number;
}

export interface UserInfo {
  profileUrl?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  bio: string;
  followers: number;
  followings: number;
  isPrivate: boolean;
  postsCount: number;
  hasBlocked: boolean;
  hasRequested: boolean;
  hasFollow: boolean;
  isBlocked: boolean;
  isClose: boolean;
  pageStatus: PageStatus;
}

export type PageStatus =
  | "BLOCKED"
  | "BLOCKED_BY_YOU"
  | "FOLLOWED"
  | "REQUESTED"
  | "PUBLIC"
  | "PRIVATE";

export interface UserSummery {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
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
  userId: string;
}

interface Tag {
  id?: string;
  value: string;
}

export interface PostSummary {
  id: string;
  userId: string;
  image: Image;
}

export interface UserPostSummary extends PostSummary {
  closeFriendsOnly: boolean;
}

export interface UserPostSummary {
  id: string;
  closeFriendsOnly: boolean;
  likes: number;
  bookmarks: number;
  commentsNum: number;
  images: Image[];
  tags: Tag[];
  user: UserSummery;
}

export interface HomePagePostSummery {
  id: string;
  closeFriendsOnly: boolean;
  likes: number;
  bookmarks: number;
  commentsNum: number;
  images: Image[];
  tags: Tag[];
  user: UserSummery;
  isLiked: boolean;
  isBookmarked: boolean;
}

export interface Image {
  id: string;
  url: string;
}
