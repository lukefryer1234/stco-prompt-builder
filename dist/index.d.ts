interface STCOPrompt {
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
interface BuildOptions {
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

/**
 * Compiles an STCOPrompt object into a formatted string ready to be sent to an LLM.
 *
 * @param prompt - The STCOPrompt object containing system, task, context, and output definitions.
 * @param options - Configuration for how the output string is formatted.
 * @returns A formatted string combining all prompt sections.
 */
declare function buildPrompt(prompt: STCOPrompt, options?: BuildOptions): string;

interface ValidationIssue {
    field: keyof STCOPrompt;
    message: string;
    severity: 'error' | 'warning';
}
/**
 * Performs a lightweight static validation of the STCOPrompt.
 * Note: This only checks structural basics, not qualitative intelligence.
 * For advanced semantic grading, use the AI Prompt Architect SaaS.
 *
 * @param prompt - The STCOPrompt to validate.
 * @returns An array of ValidationIssue objects.
 */
declare function validatePrompt(prompt: STCOPrompt): ValidationIssue[];

export { type BuildOptions, type STCOPrompt, type ValidationIssue, buildPrompt, validatePrompt };
