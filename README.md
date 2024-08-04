# WebRTC Client

This repository contains a simple WebRTC-based video call application with a signaling server.

## Files

- `server.js`: The signaling server using Socket.IO
- `client.js`: The WebRTC client-side JavaScript
- `index.html`: The HTML page for the video call interface
- `ip.js`: A utility script to get the local IP address

## Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/NuckyInSg/WebrtcClient.git
   cd WebrtcClient
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

## Starting the Signaling Server

1. Run the following command to start the server:
   ```
   node server.js
   ```
   The server will start on port 3000 by default (or the port specified in the PORT environment variable).

## Running the WebRTC Client

1. After starting the server, open a web browser and navigate to:
   ```
   http://localhost:3000
   ```
   (Replace `localhost` with your server's IP address if accessing from another device)

2. Click the "Start Call" button to initiate a video call.

3. Open the same URL in another browser window or device to join the call.

## Using ip.js

The `ip.js` script is a utility to find your local IP address. This can be useful for accessing your application from other devices on the same network.

To use ip.js:

1. Run the script:
   ```
   node ip.js
   ```

2. The script will output your local IP address. Use this address instead of `localhost` when accessing the application from other devices on your network.

## Notes

- This is a basic implementation and may not handle all edge cases or network configurations.
- For production use, consider adding security measures and improving error handling.
- HTTPS is recommended for production deployments of WebRTC applications.

## Troubleshooting

If you encounter issues:
- Ensure all required ports are open if using a firewall.
- Check browser console for error messages.
- Verify that your camera and microphone are working and that you've granted the necessary permissions to the browser.
