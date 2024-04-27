export type Users = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  website: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface UsersSliceState {
  items: Users[];
  status: Status;
}

export type CardSliceState = {
  user: Users | null;
  editedName: string;
  editedEmail: string;
  editedCompany: string;
  editedWebsite: string;
};
