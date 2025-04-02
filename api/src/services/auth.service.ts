// temporary auth storage

export type Token = {
  id: number;
  token: string;
};

let refreshTokens: Token[] = [];

// Function to add a refresh token
export const addRefreshToken = (id: number, token: string) => {
  refreshTokens.push({ id, token });
  console.log(`Refresh token added for user ID: ${id}`);
};

// Function to remove a refresh token
export const removeRefreshToken = (token: string) => {
  refreshTokens = refreshTokens.filter((t) => t.token !== token);
  console.log(`Refresh token removed: ${token}`);
};

// Function to find a refresh token by user ID
export const findRefreshTokenById = (id: number) => {
  return refreshTokens.find((token) => token.id === id);
};
