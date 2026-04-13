export interface STCOPrompt {
  /**
   * Defines the persona, role, expertise, and constraints for the AI.
   * Example: "You are a senior TypeScript developer."
   */
  system: string;

  /**
   * The specific action or problem you want the AI to solve.
   * Example: "Refactor the provided code to use React Server Components."
   */
  task: string;

  /**
   * Background information, environment details, or user input.
   * Example: "We are using Next.js 14 App Router and PostgreSQL."
   */
  context: string;

  /**
   * The desired format, length, and tone of the response.
   * Example: "Return only the refactored code block with inline comments."
   */
  output: string;
}

export interface BuildOptions {
  /**
   * Include Markdown section headers (e.g., ### System).
   * Default: true
   */
  includeHeaders?: boolean;

  /**
   * Wrap each section's content in a markdown formatting block for readability.
   * Default: false
   */
  wrapContent?: boolean;
}
