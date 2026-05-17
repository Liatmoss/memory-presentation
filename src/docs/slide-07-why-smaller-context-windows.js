const slide = {
  layout: 'comparison-cards',
  title: 'Small Sessions vs Large Sessions',
  cards: [
    {
      icon: 'summarise',
      heading: 'Small Sessions:',
      points: [
        { label: 'Higher relevance', text: 'less unrelated information competing for attention' },
        { label: 'More predictable outputs', text: 'easier to review and trust' },
      ],
    },
    {
      icon: 'layers',
      heading: 'Large Sessions:',
      points: [
        { label: 'Lost information', text: 'information gets lost in the multitude of conversations and takes longer to research and recall' },
        { label: 'Incorrect outputs', text: 'more likely to receive hallucinated or incorrect information' },
      ],
    },
  ],
}

export default slide
