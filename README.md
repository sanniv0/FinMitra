# FinMitra - Your Personal AI Investment Guide

Welcome to FinMitra, your friendly AI assistant designed to simplify investing for everyone in India. This application provides personalized investment guidance, sample investment plans, and a dictionary of financial terms, all powered by generative AI.

## ✨ Features

- **Personalized Investment Guidance**: Get tailored investment suggestions based on your age, income, risk tolerance, and financial goals.
- **Starter Investment Plans**: Explore sample investment plans for conservative, moderate, and aggressive risk profiles.
- **Finance 101 Dictionary**: Instantly get simple explanations for complex financial terms.
- **Modern & Responsive UI**: A clean, beautiful, and mobile-friendly interface built with Next.js, ShadCN, and Tailwind CSS.
- **AI-Powered**: Utilizes Google's Gemini models through Genkit for intelligent financial advice.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI Integration**: [Google's Genkit](https://firebase.google.com/docs/genkit)
- **UI**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 20 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_api_key_here
    ```
    You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI flows.

    - **Terminal 1: Start the Genkit server:**
      ```bash
      npm run genkit:watch
      ```
    - **Terminal 2: Start the Next.js development server:**
      ```bash
      npm run dev
      ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ☁️ Deployment

This application is optimized for deployment on **Netlify**.

### Deploying to Netlify

1.  **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2.  **Create a new site** on Netlify and connect it to your repository.
3.  **Configure Build Settings**: Netlify should automatically detect that this is a Next.js project and configure the build settings for you using the included `netlify.toml` file.
    - **Build command**: `npm run build`
    - **Publish directory**: `.next`
4.  **Add Environment Variables**: In your Netlify site's settings, go to `Site configuration > Environment variables` and add your `GOOGLE_API_KEY`.
5.  **Deploy**: Trigger a new deployment. Netlify will build and deploy your site.
