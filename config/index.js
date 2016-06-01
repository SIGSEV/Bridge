import dotenv from 'dotenv'

const env = process.env.NODE_ENV || 'development'
const config = require(`./${env}`).default

dotenv.load()

export default {
  env,
  port: 3001,

  dribbbleToken: process.env.DRIBBBLE,
  weatherToken: process.env.WEATHER,

  bannedRepositories: (process.env.BANNED_REPOSITORIES || '').split(','),

  ...config
}
