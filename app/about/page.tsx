export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          About AI Chat Assistant
        </h1>
        <p className="text-xl text-gray-600">
          Powered by cutting-edge AI technology to provide intelligent conversations
        </p>
      </section>

      {/* Main Content */}
      <section className="bg-white rounded-xl shadow-md p-8 space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We aim to make artificial intelligence accessible and helpful for everyone. Our chat assistant leverages 
            Google's Gemini AI to provide intelligent, context-aware responses to your questions and needs.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Key Features</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Natural Language Processing for human-like conversations</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Real-time responses with high accuracy</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Conversation history for context-aware interactions</span>
            </li>
            <li className="flex items-start">
              <svg className="w-6 h-6 text-blue-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Secure and private conversations</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-gray-700">Next.js</p>
              <p className="text-sm text-gray-500">Frontend Framework</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-gray-700">Gemini AI</p>
              <p className="text-sm text-gray-500">AI Model</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-gray-700">Tailwind CSS</p>
              <p className="text-sm text-gray-500">Styling</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="font-semibold text-gray-700">Turso DB</p>
              <p className="text-sm text-gray-500">Database</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
