# Chat with AI

A modern chat application built with Next.js that allows users to interact with AI models. The application features a clean, responsive interface and real-time chat functionality.

## Features

- Real-time chat interface
- Integration with Google's Generative AI
- Modern UI with Tailwind CSS
- TypeScript support
- Responsive design

## Prerequisites

Before running this project, make sure you have:
- Node.js installed (version 14 or higher)
- npm or yarn package manager
- A Google Generative AI API key

## Environment Setup

Create a `.env` file in the root directory with the following variables:
```env
GOOGLE_API_KEY=your_api_key_here
```

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [React](https://reactjs.org) - UI library
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) - AI integration
- [@libsql/client](https://www.npmjs.com/package/@libsql/client) - Database client

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
