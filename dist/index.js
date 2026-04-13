"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  buildPrompt: () => buildPrompt,
  validatePrompt: () => validatePrompt
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildPrompt,
  validatePrompt
});
