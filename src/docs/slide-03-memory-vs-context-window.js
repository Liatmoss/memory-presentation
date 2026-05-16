const slide = {
  title: 'Memory vs context window',
  subtitle:
    'Think of AI sessions as a workspace with limited active room, not perfect long-term memory.',
  points: [
    'Memory can help with recurring preferences, but it is not a full transcript recall engine.',
    'The context window is what the model can actively reason over right now.',
    'If a thread has been open for days, do not assume details from 2–3 days ago are still reliable in active context.',
    'High-level note: token-related changes are coming next month, which reinforces good context hygiene habits.',
  ],
}

export default slide
