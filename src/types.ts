export interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface FormState {
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface CounterState {
  count: number;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}