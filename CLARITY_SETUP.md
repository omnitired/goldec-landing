# Microsoft Clarity Setup

This project has been configured to use Microsoft Clarity for user behavior analytics.

## Setup Instructions

1. **Create a Microsoft Clarity Account**
   - Go to [Microsoft Clarity](https://clarity.microsoft.com/)
   - Sign in with your Microsoft account
   - Create a new project

2. **Get Your Project ID**
   - After creating a project, you'll receive a Project ID
   - Copy this ID (it looks like a string of letters and numbers)

3. **Configure Environment Variable**
   - Open the `.env.local` file in the project root
   - Replace `YOUR_CLARITY_PROJECT_ID` with your actual Clarity Project ID:
     ```
     NEXT_PUBLIC_CLARITY_PROJECT_ID=your_actual_project_id_here
     ```

4. **Deploy and Verify**
   - Build and deploy your application
   - Visit your website and perform some actions
   - Check your Clarity dashboard to see if data is being collected

## Features

- **Automatic Tracking**: Clarity will automatically track user interactions, clicks, scrolls, and page views
- **Heatmaps**: Visual representation of where users click and scroll
- **Session Recordings**: Watch recordings of user sessions to understand user behavior
- **Performance Insights**: Get insights into page load times and user experience

## Privacy Considerations

- Clarity respects user privacy and follows GDPR guidelines
- No personally identifiable information (PII) is collected
- Users can opt-out of tracking if needed

## Troubleshooting

- If data isn't appearing in Clarity, check that:
  - The Project ID is correctly set in `.env.local`
  - The environment variable starts with `NEXT_PUBLIC_`
  - The application has been rebuilt after adding the environment variable
  - There are no browser extensions blocking the script