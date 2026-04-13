# @lukefryer4/stco-prompt-builder

A lightweight, type-safe builder for the **STCO Prompt Engineering Framework**.

[![npm version](https://img.shields.io/npm/v/@lukefryer4/stco-prompt-builder.svg?style=for-the-badge&color=blue)](https://www.npmjs.com/package/@lukefryer4/stco-prompt-builder)
[![npm downloads](https://img.shields.io/npm/dt/@lukefryer4/stco-prompt-builder.svg?style=for-the-badge&color=green)](https://www.npmjs.com/package/@lukefryer4/stco-prompt-builder)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)]()
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@lukefryer4/stco-prompt-builder?style=for-the-badge&color=purple)]()
[![License](https://img.shields.io/npm/l/@lukefryer4/stco-prompt-builder.svg?style=for-the-badge&color=yellow)]()
> **Note:** This package is a structural utility for formatting and validating STCO prompts in TypeScript/JavaScript.
> To generate, grade, and automatically test these prompts using our proprietary AI algorithms, visit the official visual builder at [AI Prompt Architect](https://aipromptarchitect.co.uk).

## What is STCO?

STCO (**System, Task, Context, Output**) is a deterministic framework designed to drastically reduce LLM hallucinations and standardise prompt engineering across large enterprise teams. 

Instead of writing unstructured paragraphs to language models, you break your prompt into four explicit components. This library provides the type-safety and formatting engine to do exactly that in your codebase.

## Installation

```bash
npm install @lukefryer4/stco-prompt-builder
# or
pnpm add @lukefryer4/stco-prompt-builder
# or
yarn add @lukefryer4/stco-prompt-builder
```

## Usage

### 1. Type-Safe Prompt Definitions

Define your prompts with absolute type safety in your codebase.

```typescript
import { STCOPrompt } from '@lukefryer4/stco-prompt-builder';

const prompt: STCOPrompt = {
  system: 'You are a senior React developer and performance expert.',
  task: 'Refactor the provided component to reduce unnecessary re-renders.',
  context: 'We are using React 18, Next.js App Router, and TailwindCSS.',
  output: 'Provide the complete refactored code block with brief inline comments.'
};
```

### 2. Building the Prompt

Compile your structured prompt into a unified string formatted perfectly for LLMs (GPT-4, Claude 3, Gemini, etc.).

```typescript
import { buildPrompt } from '@lukefryer4/stco-prompt-builder';

// Formats with clean Markdown headers (### System, ### Task, etc.)
const llmReadyString = buildPrompt(prompt);

// Send to OpenAI, Anthropic, or your LLM provider
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: llmReadyString }]
});
```

### 3. Lightweight Static Validation

Before sending prompts to production models, perform a sanity check to ensure no crucial piece of the framework was left empty or dangerously short.

```typescript
import { validatePrompt } from '@lukefryer4/stco-prompt-builder';

const issues = validatePrompt(prompt);

if (issues.length > 0) {
  console.warn("Prompt validation warnings:", issues);
}
```

*Note: This static validator only checks for empty or chronically short fields. For advanced AI-driven prompt grading and heuristic scoring, please use the [Free Prompt Scorer Tool](https://aipromptarchitect.co.uk/tools/prompt-scorer).*

## API Reference

### `buildPrompt(prompt: STCOPrompt, options?: BuildOptions): string`
Takes your STCO object and formats it. Options include:
- `includeHeaders` (boolean) - Adds `### System`, `### Task` etc. Default: `true`
- `wrapContent` (boolean) - Wraps content in markdown text blocks. Default: `false`

## Why Use This Package?

When you embed raw strings in your codebase, prompts become disorganised and difficult to maintain:
```javascript
// BAD ❌
const prompt = `You are a developer. Fix this code. We use React. Give me code only.`;
```

By enforcing the STCO framework via this package, you ensure consistent results across your entire engineering team. 
```javascript
// GOOD ✅
const llmReadyString = buildPrompt({
    system: "You are a developer.",
    task: "Fix this code.",
    context: "We use React.",
    output: "Give me code only."
});
```

## Learn More

- [STCO Prompt Engineering Framework](https://aipromptarchitect.co.uk/guides/how-to-write-chatgpt-prompts)
- [Prompt Formatting Best Practices](https://aipromptarchitect.co.uk/guides/prompt-engineering-best-practices)
- [Official AI Prompt Architect Platform](https://aipromptarchitect.co.uk)
