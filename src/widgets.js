export default {

  Weather: {
    style: {
      width: 250,
      height: 194
    },
    url: '/weather',
    timeToRefresh: 5e3
  },

  Github: {
    style: {
      width: 350,
      height: 300
    },
    url: '/github/trending?lang=javascript',
    timeToRefresh: 5e3
  },

  StackOverflow: {
    style: {
      width: 350,
      height: 500
    },
    url: '/stack/recent?tag=javascript',
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
    url: '/rss?feed=https://reflets.info/feed',
    timeToRefresh: 5e3
  }

}
