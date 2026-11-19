# PROMPT_LOG

> Edit this file so it matches what you really did. Replace each **Technique** with the exact names from your class list
> (for example role prompting, few-shot, chain-of-thought, or a framework such as CRISPE, RTCF, or CO-STAR).
> Fill in **Result summary**, **Evaluation** and **Improvement** with your own honest observations after you test.

## Entry 1 - Define the project
- **Technique or framework:** (write your class technique here, e.g. Role + Context + Constraints)
- **Purpose:** Get a project definition and scope that can be finished in the exam period.
- **Exact prompt:**
  ```
  You are a senior web development instructor. I am a college student with a practical exam.
  Context: I must build a frontend-only clothing apparel catalog using HTML, CSS, JavaScript and Bootstrap.
  Task: Write a project definition with title, problem, target users, objectives, main features and planned pages.
  Constraints: Beginner-friendly, no backend, at least 3 pages, a form with validation, 3+ JavaScript features.
  Output: A short document with the six headings above.
  ```
- **Result summary:** (describe what the AI gave you)
- **Evaluation:** (what was correct, what was wrong or missing)
- **Improvement:** (your revised prompt or manual fix)

## Entry 2 - Generate the application
- **Technique or framework:** (e.g. Structured output + Step-by-step)
- **Purpose:** Produce the working website files.
- **Exact prompt:**
  ```
  Build a working, responsive clothing catalog called "Thread & Lane" using HTML, CSS, JavaScript and Bootstrap 5.
  Pages: Home, Catalog, Cart/Checkout in separate files (index.html, pages/, assets/css, assets/js).
  Features: search, category/size/price filters, sorting, wishlist and cart saved in localStorage,
  a checkout form with validation and clear error messages.
  Constraints: frontend only, sample data, accessible labels, visible keyboard focus, no console errors.
  Output: every file in full, then a short explanation of the important code.
  ```
- **Result summary:** (describe the files and features produced)
- **Evaluation:** (e.g. features that worked; anything missing)
- **Improvement:** (your follow-up prompt or manual correction)

## Entry 3 - Test and improve
- **Technique or framework:** (e.g. Self-critique / Iterative refinement)
- **Purpose:** Find bugs and gaps against the exam checklist.
- **Exact prompt:**
  ```
  Review the code below against this checklist: navigation, form validation (valid, invalid, empty),
  responsive layout, accessibility, console errors, localStorage. List problems and give the fix for each.
  [paste your code]
  ```
- **Result summary:** (list what the AI found)
- **Evaluation:** (which findings were real, which were wrong)
- **Improvement:** (the fixes you applied; repeat in README Testing section)

## Entry 4 - Explain the code for demonstration
- **Technique or framework:** (e.g. Role prompting / Audience-specific explanation)
- **Purpose:** Be able to explain the project to the instructor.
- **Exact prompt:**
  ```
  Explain script.js to a first-year student in plain language. For each function say what it does and where it is used.
  Then give me 5 questions an instructor might ask and short answers.
  ```
- **Result summary / Evaluation / Improvement:** (fill in)
