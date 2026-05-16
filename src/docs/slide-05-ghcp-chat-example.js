const slide = {
  title: 'GHCP Chat example',
  subtitle: 'Bad pattern vs better pattern for chat threads.',
  points: [
    'Bad: one thread used for roadmap planning, bug triage, copy edits, and hiring notes.',
    'Better: one chat per deliverable; start a new chat as soon as topic shifts.',
    'Result: cleaner prompts, stronger outputs, easier review.',
  ],
  examples: [
    {
      label: 'Less effective (single mixed thread)',
      code: `# Chat Thread A\n1) Plan Q3 roadmap\n2) Debug CLI auth error\n3) Write onboarding copy\n4) Summarize design critique`,
    },
    {
      label: 'Better (focused chats)',
      code: `# Chat Thread A\nTask: Plan Q3 roadmap\n\n# Chat Thread B\nTask: Debug CLI auth error\n\n# Chat Thread C\nTask: Write onboarding copy`,
    },
  ],
}

export default slide
