const slide = {
  layout: 'content-card',
  title: 'Switching Models',
  card: {
    icon: 'swap',
    heading: 'Switching models after a lot of work:',
    points: [
      'Loss of previous context',
      'Inconsistent or incorrect answers',
      'Mistakes in long tasks',
      'Extra token usage because the new model may need to re-read or re-derive everything',
    ],
    secondaryHeading: 'Best practices:',
    secondaryPoints: [
      'Keep the same model for the whole task',
      'Avoid switching unless you have a specific reason',
    ],
  },
}

export default slide
