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
      tag: 'javascript',
      extra: '',
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
    reload: 30,
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
    reload: 60 * 3,
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

  Deluge: {
    style: {
      width: 350,
      height: 300,
    },
    config: {
      host: null,
      pass: '',
    },
    requires: ['host'],
    url: '/deluge',
    reload: 10,
  },

  Clock: {},
  Timer: {},

}
