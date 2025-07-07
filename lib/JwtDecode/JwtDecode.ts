import { jwtDecode } from "jwt-decode";

export interface DecodedUser {
  id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const JwtDecode = (payload: string): DecodedUser => {
  return jwtDecode<DecodedUser>(payload);
};
