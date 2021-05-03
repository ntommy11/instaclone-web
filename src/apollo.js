import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); // Reactive variable!
export const logUserIn = (token)=>{
  localStorage.setItem(TOKEN,token);
  isLoggedInVar(true);
}
export const logUserOut = ()=>{
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
}
const DARK_MODE = "DARK_MODE";

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const enableDarkmode = ()=>{
  localStorage.setItem(DARK_MODE,"true");
  darkModeVar(true);
}

export const disableDarkmode = ()=>{
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
}

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

