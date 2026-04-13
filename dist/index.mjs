// src/builder.ts
function buildPrompt(prompt, options) {
  const { includeHeaders = true, wrapContent = false } = options || {};
  const sections = [];
  const formatSection = (title, content) => {
    if (!content || content.trim() === "") return null;
    let sectionString = "";
    if (includeHeaders) {
      sectionString += `### ${title}
`;
    }
    if (wrapContent) {
      sectionString += `\`\`\`text
${content.trim()}
\`\`\`
`;
    } else {
      sectionString += `${content.trim()}
`;
    }
    return sectionString;
  };
  const systemSection = formatSection("System", prompt.system);
  if (systemSection) sections.push(systemSection);
  const taskSection = formatSection("Task", prompt.task);
  if (taskSection) sections.push(taskSection);
  const contextSection = formatSection("Context", prompt.context);
  if (contextSection) sections.push(contextSection);
  const outputSection = formatSection("Output", prompt.output);
  if (outputSection) sections.push(outputSection);
  return sections.join("\n");
}

// src/validator.ts
function validatePrompt(prompt) {
  const issues = [];
  const checkField = (field, minWarning, minError) => {
    const content = prompt[field] || "";
    if (content.trim().length === 0) {
      issues.push({ field, message: `${field} field is missing or empty.`, severity: "error" });
    } else if (content.length < minError) {
      issues.push({ field, message: `${field} field is critically short (${content.length} chars).`, severity: "error" });
    } else if (content.length < minWarning) {
      issues.push({ field, message: `${field} field could be more detailed.`, severity: "warning" });
    }
  };
  checkField("system", 20, 5);
  checkField("task", 15, 5);
  checkField("context", 10, 5);
  checkField("output", 10, 5);
  return issues;
}
export {
  buildPrompt,
  validatePrompt
};
