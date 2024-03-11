/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      }
    ]
  },
  env: {
    API_KEY: 'AIzaSyBnAjq1AWPM5IRs6mrnw1QKJsOSy9IOSUo',
  },
}

module.exports = nextConfig;
