// Credits
// https://stackoverflow.com/a/40724354/2054072
//
// thousand -> million -> billion -> trillion -> gorillon
const SYMBOLS = ['', 'k', 'M', 'B', 'T', 'G']

export default number => {
  const tier = (Math.log10(number) / 3) | 0

  if (tier === 0) {
    return number
  }

  const suffix = SYMBOLS[tier]
  const scale = Math.pow(10, tier * 3)

  const scaled = number / scale
  return `${scaled.toLocaleString(undefined, { maximumFractionDigits: 1 })}${suffix}`
}
