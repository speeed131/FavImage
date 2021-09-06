// define api interface

export interface IRegisterRequest {
  username: string;
  password: string;
}

export interface IRegisterResponse {
  id: number;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
}

export interface IUser {
  id: number;
  username: string;
  email?: string;
  disabled?: boolean;
  hashed_password?: string;
}

export interface IImage {
  image_id: number;
  type?: string;
  tags?: string;
  preview_url: string;
  page_url: string;
  webformat_url: string;
  large_image_url?: string;
  downloads?: number;
  likes?: number;
}

export interface IFavoriteImage {
  id?: number;
  user_id: number;
  image_id: number;
  type?: string;
  tags?: string;
  preview_url: string;
  page_url: string;
  webformat_url: string;
  large_image_url?: string;
  downloads?: number;
  likes?: number;
}

export interface IFavoriteImageResponse {
  id: number;
}
