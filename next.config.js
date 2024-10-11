/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    
    domains:['lh3.googleusercontent.com' ,'files.stripe.com']// accept images from google providre and stripe 
  },
}

module.exports = nextConfig
