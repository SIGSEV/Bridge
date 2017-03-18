export default {

  Weather: {
    style: {
      width: 250,
      height: 194
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

  Crypto: {
    style: {
      width: 200,
      height: 100
    },
    config: {
      pair: 'xbtusd'
    },
    url: '/crypto'
  },

  Rss: {
    style: {
      width: 350,
      height: 300
    },
    config: {
      feed: null
    },
    requires: ['feed'],
    url: '/rss'
  },

  Bookmarks: {
    style: {
      width: 350
    },
    config: {
      books: []
    },
    requires: ['books']
  },

  Clock: {},
  Timer: {},

}
