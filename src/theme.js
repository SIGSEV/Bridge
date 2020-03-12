const opacity = (code, a) => `rgba(${code}, ${code}, ${code}, ${a})`

const dark = {
  name: 'dark',

  c025: opacity(250, 0.025),
  c05: opacity(250, 0.05),
  c1: opacity(250, 0.1),
  c15: opacity(250, 0.15),
  c2: opacity(250, 0.2),
  c3: opacity(250, 0.3),
  c4: opacity(250, 0.4),
  c5: opacity(250, 0.5),
  c6: opacity(250, 0.6),
  c8: opacity(250, 0.8),

  op: opacity(5, 1),

  bg: '#232323',
}

const light = {
  name: 'light',

  c025: opacity(0, 0.025),
  c05: opacity(0, 0.05),
  c1: opacity(0, 0.1),
  c15: opacity(0, 0.15),
  c2: opacity(0, 0.2),
  c3: opacity(0, 0.3),
  c4: opacity(0, 0.4),
  c5: opacity(0, 0.5),
  c6: opacity(0, 0.6),
  c8: opacity(0, 0.8),

  op: opacity(250, 1),

  bg: 'white',
}

export default {
  ...dark,
  light,

  blue: '#268bd2',
}
