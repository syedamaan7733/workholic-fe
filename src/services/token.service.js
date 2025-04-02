
export class TokenService {
  TOKEN_KEY = "access_workH_tkn";

  setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}

export const authToken = new TokenService();
