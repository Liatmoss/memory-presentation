const slide = {
  title: 'When to continue vs start new',
  subtitle: 'If the task changes, start a new session.',
  points: [
    'Continue the same session when the task is the same deliverable.',
    'Start a new session for a new issue, audience, or objective.',
    'Avoid using one long session for unrelated conversations.',
    'Use the AI like a focused workspace, not a long-lived memory dump.',
  ],
  examples: [
    {
      label: 'Continue same session',
      code: `Task: finalize release notes draft\nFollow-up: tighten wording for PM audience\nFollow-up: add one design example`,
    },
    {
      label: 'Start new session',
      code: `Old task done: release notes\nNew task: security questionnaire response\nAction: open fresh session with only relevant context`,
    },
  ],
}

export default slide
