import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to AI Chat Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience intelligent conversations powered by Google's Gemini AI. Get instant responses, insights, and assistance for all your queries.
        </p>
        <Link 
          href="/chat" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Chatting
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Intelligent Chat</h3>
          <p className="text-gray-600">Engage in natural conversations with our advanced AI powered by Google's Gemini.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Instant Responses</h3>
          <p className="text-gray-600">Get quick and accurate responses to your questions in real-time.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Customizable</h3>
          <p className="text-gray-600">Personalized chat experience with conversation history and settings.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-50 py-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
        <p className="text-gray-600 mb-6">Begin your conversation with our AI assistant today</p>
        <Link 
          href="/chat" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Try it Now
        </Link>
      </section>
    </div>
  );
}
