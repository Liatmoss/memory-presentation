const slide = {
  title: 'GHCP CLI example',
  subtitle: 'Use fresh terminal sessions for fresh issues.',
  points: [
    'Bad: one long-lived CLI session reused for unrelated tasks over days.',
    'Better: new CLI session per issue or deliverable.',
    'Result: less accidental context bleed and clearer intent.',
  ],
  examples: [
    {
      label: 'Less effective (long-lived mixed session)',
      code: `$ ghcp chat\n> fix dashboard bug\n...later...\n> draft design rationale\n...later...\n> review PM kickoff notes`,
    },
    {
      label: 'Better (fresh session per issue)',
      code: `$ ghcp chat --new\n> issue #412: fix dashboard bug\n\n$ ghcp chat --new\n> prepare design rationale for nav update\n\n$ ghcp chat --new\n> summarize PM kickoff decisions`,
    },
  ],
}

export default slide
