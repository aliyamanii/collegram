export interface UserMeInfo {
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

export interface UserInfo {
  profileUrl?: string;
  username?: string;
  firstName: string;
  lastName: string;
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
}

export interface UserWhoMBlockedYou extends UserInfo {
  hasBlocked: true;
}

export interface UserWhoIsPrivate extends UserInfo {
  hasBlocked: false;
  isPrivate: true;
}

interface UserSummary {
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

export interface PostSummary {
  id: string;
  userId: string;
  image: Image;
}

export interface MyPostSummary extends PostSummary {}

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
  user: UserSummary;
}

export interface Image {
  id: string;
  url?: string;
  path?: string;
}
