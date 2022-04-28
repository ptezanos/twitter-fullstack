export interface User {
    profile_image_url: string | null;
    id: string | null;
    username: string | null;
    name: string | null;
  }

export interface Tweet {
    id: string | null;
    text: string | null;
  }

export interface TwitterObject {
    data: Tweet[];
    includes?: IncludesObject;
    meta: object;
  }

export interface IncludesObject {
    media: MediaObject[];
  }

export interface MediaObject {
    media_key: string;
    type: string;
    url?: string;
    resolution?: string;
  }