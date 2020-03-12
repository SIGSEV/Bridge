import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`).default

if (!process.env.BUILD) {
  dotenv.config()
}

export default {
  env,
  port: 3001,

  weatherToken: process.env.WEATHER,

  bannedRepositories: (process.env.BANNED_REPOSITORIES || '').split(','),

  ...config,
}
