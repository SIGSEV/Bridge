export default {

  Weather: {
    style: {
      width: 250,
      height: 194
    },
    config: {
      city: 'paris'
    },
    url: '/weather'
  },

  Github: {
    style: {
      width: 350,
      height: 300
    },
    config: {
      language: null
    },
    url: '/github/trending'
  },

  StackOverflow: {
    style: {
      width: 350,
      height: 500
    },
    config: {
      site: 'stackoverflow',
      tag: 'javascript'
    },
    url: '/stack/recent'
  },

  Dribbble: {
    style: {
      width: 250,
      height: 250
    },
    url: '/dribbble'
  },

  Bitcoin: {
    style: {
      width: 200,
      height: 100
    },
    url: '/bitcoin'
  },

  Rss: {
    style: {
      width: 350,
      height: 300
    },
    config: {
      feed: 'https://reflets.info/feed'
    },
    url: '/rss'
  }

}
