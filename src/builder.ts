import { STCOPrompt, BuildOptions } from './types';

/**
 * Compiles an STCOPrompt object into a formatted string ready to be sent to an LLM.
 *
 * @param prompt - The STCOPrompt object containing system, task, context, and output definitions.
 * @param options - Configuration for how the output string is formatted.
 * @returns A formatted string combining all prompt sections.
 */
export function buildPrompt(prompt: STCOPrompt, options?: BuildOptions): string {
  const { includeHeaders = true, wrapContent = false } = options || {};

  const sections: string[] = [];

  const formatSection = (title: string, content: string) => {
    if (!content || content.trim() === '') return null;
    
    let sectionString = '';
    
    if (includeHeaders) {
      sectionString += `### ${title}\n`;
    }
    
    if (wrapContent) {
      sectionString += `\`\`\`text\n${content.trim()}\n\`\`\`\n`;
    } else {
      sectionString += `${content.trim()}\n`;
    }
    
    return sectionString;
  };

  const systemSection = formatSection('System', prompt.system);
  if (systemSection) sections.push(systemSection);

  const taskSection = formatSection('Task', prompt.task);
  if (taskSection) sections.push(taskSection);

  const contextSection = formatSection('Context', prompt.context);
  if (contextSection) sections.push(contextSection);

  const outputSection = formatSection('Output', prompt.output);
  if (outputSection) sections.push(outputSection);

  return sections.join('\n');
}
