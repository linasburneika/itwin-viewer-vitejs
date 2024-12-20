import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Auth } from './Auth';

Auth.initialize({
  scope: import.meta.env.VITE_IMJS_AUTH_CLIENT_SCOPES,
  clientId: import.meta.env.VITE_IMJS_AUTH_CLIENT_CLIENT_ID,
  redirectUri: import.meta.env.VITE_IMJS_AUTH_CLIENT_REDIRECT_URI,
  postSignoutRedirectUri: import.meta.env.VITE_IMJS_AUTH_CLIENT_LOGOUT_URI,
  responseType: 'code',
  authority: import.meta.env.VITE_IMJS_AUTH_AUTHORITY,
});

const container = document.getElementById('root');
const root = createRoot(container!);

const redirectUrl = new URL(import.meta.env.VITE_IMJS_AUTH_CLIENT_REDIRECT_URI);
if (redirectUrl.pathname === window.location.pathname) {
  Auth.handleSigninCallback().catch(console.error);
} else {
  console.log('rendering');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
