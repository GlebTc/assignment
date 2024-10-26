# Submission Notes

## BarChart Component
- Used `react-chartjs-2` to create a visual summary of targets by pipeline status.

## Target Table
- Built an editable table where users can modify target data directly.
- Changes are saved via a PUT request to update `targets.json` (note: this works locally but would need further setup for production).

## Dashboard Data Handling
- Fetches and filters data, applying the selected pipeline status filter to both the bar chart and table.

## Minor Features
- Added a loading screen simulation for user experience.
- Implemented light/dark mode toggling.
