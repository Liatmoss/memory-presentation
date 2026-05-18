const slide = {
  layout: 'content-card',
  title: 'Model Choices',
  subtitle: 'Larger models = increased context = higher cost',
  card: {
    icon: 'brain',
    heading: 'Choose a larger model when:',
    points: [
      'The task is complex',
      'There is a lot of information to sort through',
      'Accuracy and reasoning are important',
      'For example, complex documentation of services',
    ],
    secondaryIcon: 'lightning',
    secondaryHeading: 'Choose a smaller model when:',
    secondaryPoints: [
      'The task is short',
      'The answer is straightforward',
      'For example, a minor code change',
    ],
  },
}

export default slide
