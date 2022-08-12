import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`).default

if (!process.env.BUILD) {
  dotenv.load()
}

export default {
  env,
  port: 4455,

  weatherToken: process.env.WEATHER,

  bannedRepositories: (process.env.BANNED_REPOSITORIES || '').split(','),

  ...config,
}
