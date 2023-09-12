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
