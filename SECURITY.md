# Security

Pulse is a browser-only Spotify controller. It uses Spotify Authorization Code with PKCE and never asks for or stores your Spotify password. It does not require a Spotify Client Secret.

The Spotify Client ID is public by design and is stored in the browser's local storage. Access and refresh tokens are held in session storage and are removed when that browser session ends or you disconnect.

Never commit any of the following to GitHub:

- Spotify account passwords
- Spotify Client Secrets
- Access or refresh tokens
- Personal API keys

Use HTTPS in production. Register only exact trusted HTTPS redirect URLs in the Spotify developer dashboard. If you believe a token was exposed, disconnect the app from your Spotify account and reconnect it.

The included Content Security Policy limits scripts and network requests to this app and Spotify's official API hosts. Because this is a static browser app, anyone who can open the site can inspect its source. Do not try to hide secrets in JavaScript, GitHub Actions build variables, or minified files.
