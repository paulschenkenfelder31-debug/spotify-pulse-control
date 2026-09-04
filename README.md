# Pulse — Spotify Control

An animated, browser-only Spotify dashboard for GitHub Pages. It includes:

- Play, pause, previous, next, seek, volume, shuffle, and repeat controls
- Playlist browsing and one-tap playback
- Queue, recently played tracks, device switching, search, and Liked Songs
- A complete demo mode that works before Spotify is connected
- Authorization Code with PKCE: no Spotify password or client secret is stored
- Installable app metadata, a locked-down browser content policy, and a GitHub Pages deployment workflow

## Connect Spotify

1. Create an app at [Spotify for Developers](https://developer.spotify.com/dashboard).
2. Copy its **Client ID**. Do not use or publish the Client Secret.
3. In the app settings, add your final GitHub Pages URL as a Redirect URI. It must exactly match the URL shown by Pulse in **Connection settings**.
4. Open Pulse, choose **Connection settings**, paste the Client ID, and connect.

Spotify access and refresh tokens are stored in `sessionStorage`, so the connection ends when the browser session closes. The public Client ID is stored locally in that browser. Pulse asks only for the Spotify scopes used by its visible controls.

Some Spotify playback endpoints require a Premium account and an active Spotify device.

## Publish on GitHub Pages

Push this project to the `main` branch of a GitHub repository. In **Settings → Pages**, choose **GitHub Actions** as the source. The included workflow publishes `dist/` automatically after each push.

After GitHub gives you the Pages address, add that exact address as a Redirect URI in your Spotify developer app. Do not add a Client Secret, Spotify password, or access token to repository files or compiled JavaScript.

## Release checklist

- GitHub Pages source is set to GitHub Actions.
- The exact production URL is registered as a Spotify Redirect URI.
- Only the public Spotify Client ID is entered in Pulse.
- Your Spotify account is listed as an approved app user while the Spotify app is in development mode.
- Playback is active on at least one Spotify device.

See `SECURITY.md` for the security model and credential guidance.


## Icons

The interface uses adapted Lucide-style line pictograms. Lucide is licensed under the ISC License; see `ICON-LICENSE.txt`.
