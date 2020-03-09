export default {
  Bookmarks: {
    style: {
      width: 350,
    },
    config: {
      books: [],
    },
    requires: ['books'],
  },

  Clock: {},

  Crypto: {
    style: {
      width: 200,
      height: 100,
    },
    config: {
      coin: 'btc',
      preferred: 'usd',
    },
    reload: 30,
    url: '/crypto',
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

  Dribbble: {
    style: {
      width: 250,
      height: 250,
    },
    url: '/dribbble',
  },

  Github: {
    style: {
      width: 350,
      height: 300,
    },
    config: {
      language: null,
    },
    url: '/github/trending',
  },

  Rss: {
    style: {
      width: 350,
      height: 300,
    },
    config: {
      feed: null,
    },
    reload: 60 * 3,
    requires: ['feed'],
    url: '/rss',
  },

  StackOverflow: {
    style: {
      width: 350,
      height: 500,
    },
    config: {
      site: 'stackoverflow',
      tag: 'javascript',
      extra: '',
    },
    url: '/stack/recent',
  },

  Timer: {},

  Weather: {
    style: {
      width: 250,
      height: 135,
    },
    url: '/weather',
  },

  Trollbox: {
    style: {
      width: 350,
      height: 300,
      overflowX: 'hidden',
    },
  },
}
