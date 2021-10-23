export interface JwtResponse {
  dataUser: {
    id: Number;
    fName: String;
    lName: String;
    email: String;
    priv: String;
    accessToken: string;
    expiresIn: string;
  };
}
