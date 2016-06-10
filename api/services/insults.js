import q from 'q'

/**
 *  These responses are only for fun purposes, do not take them seriously ;)
 *  PRs to increase the list always encouraged, but stay on geeky grounds.
 */
const responses = {
  morning: [
    'Get the fuck up you lazy piece of shit.',
    'Out of bed fucking worm!',
    'This should have not happen if you didn\'t spent all night watching GoT.',
    'How twirp of you, go to work!',
    'Your alarm is perfectly fine, do not use this lame excuse ever again.',
    'No, SSH is still not an option at your company.',
    'If you\'re not happy, go find a remote job!',
  ],
  afternoon: [
    'No, you\'re not leaving early today again!',
    'It\'s not break time yet, fucking deadbeat.',
    'You\'ve commited less lines of code today than the number of coffee cups you drank.',
  ],
  night: [
    'Remember to brush your teeth before going to bed.',
    'You have work to do tomorrow, go to sleep, now!',
    'Get off Reddit.',
    'Someone will spoil you the latest GoT anyway',
  ],
  whatever: [
    'Go code!',
    'I see you! Stop going on 10fastfingers!',
    'When will you help someone on StackOverflow? How selfish..',
    'Time to open-source a project and give back to the community.',
    'You\'ll never have as much reputation as Jon Skeet.',
    `Still using Adblock Plus in ${new Date().getFullYear()}? How casual.`,
  ]
}

export const getOne = hour => {
  const time = hour >= 6 && hour <= 11 ? 'morning' : hour <= 18 ? 'afternoon' : 'night'
  const sentences = responses[time].concat(responses.whatever)
  return q(sentences[Math.floor(Math.random() * sentences.length)])
}
