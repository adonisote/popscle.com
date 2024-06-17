/** @type {import('next').NextConfig} */
const nextConfig = {
  //redirect from /s to /home
  async redirects() {
    return [
      {
        source: '/s',
        destination: '/home',
        permanent: true
      }
    ]
  }

};

export default nextConfig;
