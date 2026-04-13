import { STCOPrompt } from './types';

export interface ValidationIssue {
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
export function validatePrompt(prompt: STCOPrompt): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const checkField = (field: keyof STCOPrompt, minWarning: number, minError: number) => {
    const content = prompt[field] || '';
    if (content.trim().length === 0) {
      issues.push({ field, message: `${field} field is missing or empty.`, severity: 'error' });
    } else if (content.length < minError) {
      issues.push({ field, message: `${field} field is critically short (${content.length} chars).`, severity: 'error' });
    } else if (content.length < minWarning) {
      issues.push({ field, message: `${field} field could be more detailed.`, severity: 'warning' });
    }
  };

  // Basic length checks
  checkField('system', 20, 5);
  checkField('task', 15, 5);
  checkField('context', 10, 5);
  checkField('output', 10, 5);

  return issues;
}
