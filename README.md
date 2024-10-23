# Target Management Dashboard

## Overview

For this task, you will create a dashboard page for managing acquisition targets. This task is designed to evaluate your full-stack development skills, including your ability to work with existing codebases, implement new features, and create intuitive user interfaces.

## Task Details

### Core Components

The dashboard page should include the following components:

1. **Bar Chart**: A bar chart summarizing the number of acquisition targets by pipeline status.
2. **Target Table**: A table listing all acquisition targets, grouped by pipeline status and sorted by last updated date descending.

Assume this page and its components are actually part of a larger application, consider this when designing the components.

### Additional Functionality

- **Global Filter**: Add a filter that affects both the bar chart and table, allowing users to filter acquisition targets by pipeline status.
- **Editable Pipeline Status**: Allow users to change the pipeline status of a target directly from the table (and update the database with the new status, i.e. the `data/targets.json` file).

### Bonus Tasks

- Design the strategy to manage and track changes to the pipeline statuses of targets. Consider the database schema, data update strategy, etc.
- Identify any non-trivial edge cases with the implemented features and how you would handle them.

## Evaluation Criteria

Your submission will be evaluated based on the following criteria:

1. **Functionality**: Does the component work as expected and handle edge cases?
2. **Code Quality**: Is the code readable, maintainable, and reusable?
3. **Design and User Experience**: Is the component visually appealing, responsive, and user-friendly?
4. **Problem Solving**: How did you approach the problem and implement the solution?

## Getting Started

1. Clone the provided Next.js 14 application repository.
2. The application is set up with TypeScript and Tailwind CSS.
3. A placeholder dashboard page `app/dashboard/page.tsx` is already set up for you.
4. Sample acquisition target data is provided in `data/targets.json`. This is used to simulate database queries (see `app/api/targets/route.ts`).

## Guidelines

- The expected time commitment is ~3-4 hours.
- If you find yourself taking more time, focus on completing the core components.
- You can use any tools you would normally use in day-to-day work (e.g., Google, copilot, etc.).
- You can add, edit, or remove any files you feel necessary to complete the task.
- You can add any additional libraries you feel necessary to complete the task as long as they have appropriate licenses.

## Submission Guidelines

1. Complete the code within the provided Next.js application.
2. In the `submission-notes.md` file, add any of the following notes:
   - Your answer to the bonus tasks
   - If there are items you didn't have time to implement, explain how you would approach the implementation.
   - If you have any suggestions for further improvements not included in this task, feel free to add notes about these as well.
3. Zip up the entire project directory and email it to wendy@analyst3.ai, the project should be ready to run as is.

## Questions?

If you have any questions about the assignment, please don't hesitate to reach out to wendy@analyst3.ai.

Good luck, and we look forward to seeing your submission!

## Notes

Your submission will be used for the purpose of this interview only and will not be shared with any third parties or used for any other purpose. You can share, reuse, and modify the code for your own portfolio if you wish.
