# mars-wastenet-dashboard
A public, live data and community portal for the Mars In-Situ Resource Utilization (MIRU) waste management system.
 MarsWasteNet: The MIRU System Portal
Project Overview
MarsWasteNet is a dynamic, public-facing web portal designed for the Mars In-situ Resource Utilization (MIRU) system—a concept for a closed-loop waste management and resource recovery infrastructure for the first Martian colonies.

This platform transforms complex engineering data into an engaging, educational, and collaborative experience, serving as a powerful tool for STEM inspiration and global community involvement.

Key Features & Challenge Alignment
1. The MIRU Live Dashboard (Data & STEM)
The core feature provides real-time operational status, turning raw data into compelling visualizations:

Live Metrics: Track simulated operational data such as Daily Mass Processed (kg) and System Efficiency (%).

Chart Visualization: Uses Chart.js to display Waste Distribution, Processing Trends, and Resource Recovery Rates (water, oxygen, metals).

STEM Inspiration: Directly addresses the need for public engagement by making critical Martian infrastructure performance visible and easily digestible for all ages.

2. Community Innovation Hub (Collaboration)
The portal actively encourages global citizens to contribute to the future of space settlement:

Idea Contribution: Logged-in users can submit and share innovative ideas for optimizing waste processing and resource utilization on Mars.

Idea Validation: A simple "Like" feature provides instant community feedback, helping to surface the most promising concepts.

Community Building: Features sections for Participation, Colony Map, and a STEM Hub to foster a network of global space enthusiasts and problem-solvers.

## Setup Instructions

### Environment Variables

This project uses Firebase for authentication and data storage. To run the application, you need to configure your Firebase credentials:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration values in the `.env` file. You can obtain these from your Firebase project settings:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Navigate to Project Settings > General
   - Scroll down to "Your apps" and copy the configuration values

3. **IMPORTANT**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it.

### Security Best Practices

- **Never** hardcode API keys directly in source code
- **Never** commit `.env` files to version control
- Use environment variables for all sensitive configuration
- Regularly rotate API keys if they are accidentally exposed
- If an API key is leaked, immediately revoke it in Firebase Console and generate a new one


