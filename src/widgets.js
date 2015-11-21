export default {

  Weather: {
    style: {
      width: 250,
      height: 194
    },
    config: {
      city: 'paris'
    },
    url: '/weather',
    timeToRefresh: 5e3
  },

  Github: {
    style: {
      width: 350,
      height: 300
    },
    config: {
      language: null
    },
    url: '/github/trending',
    timeToRefresh: 5e3
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
    url: '/stack/recent',
    timeToRefresh: 5e3
  },

  Dribbble: {
    style: {
      width: 250,
      height: 250
    },
    url: '/dribbble',
    timeToRefresh: 5e3
  },

  Bitcoin: {
    style: {
      width: 200,
      height: 100
    },
    url: '/bitcoin',
    timeToRefresh: 5e3
  },

  Rss: {
    style: {
      width: 350,
      height: 300
    },
    config: {
      feed: 'https://reflets.info/feed'
    },
    url: '/rss',
    timeToRefresh: 5e3
  }

}
