import { setContext } from 'apollo-link-context';

export function SetAuthToken(token: string) {
  console.log('set token', token);
  localStorage.setItem('user-token', token);
}
export function ClearAuthToken() {
  localStorage.removeItem('user-token');
}

export function GetAuthToken() {
  return localStorage.getItem('user-token') || '';
}

export const AuthLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = GetAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token && token !== 'undefined'
        ? {
            'x-token': token,
          }
        : {}),
    },
  };
});
