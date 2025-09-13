// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans">
      {/* Top Navbar */}
      <nav className="bg-blue-900 text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>📞 +91 9516991004</span>
          <span>📧 support@Intellilearn.com</span>
        </div>
        <div className="text-sm">🌐 Intellilearn.app</div>
      </nav>

      {/* Main Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-900">📘 Intellilearn</div>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>Home</li>
          <li>Features</li>
          <li>Subjects</li>
          <li>Solutions</li>
          <li>Insights</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <div className="flex space-x-4">
          {/* Login and Trial Buttons */}
          <div className="flex space-x-4">
  {/* Login as Student */}
  <Link to="/login">
    <button className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">
      👨‍🎓 Login as Student
    </button>
  </Link>

  {/* Login as Guardian */}
  <Link to="/guardian">
    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
      👨‍👩‍👧‍👦 Login as Guardian
    </button>
  </Link>

  {/* Start Trial */}
  <Link to="/trial">
    <button className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-500">
      Start Trial
    </button>
  </Link>
</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[500px]"
        style={{ backgroundColor: 'golden' }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-10 text-black"
          style={{
            backgroundImage:
              "url('https://entryeducation.edu.au/wp-content/uploads/2024/01/Benefits-of-studying-online.jpg')",
          }}
        >
          <h1 className="text-4xl font-bold max-w-xl mb-4">
            Your Ultimate Study Companion – Smarter. Faster. Focused.
          </h1>
          <p className="text-lg max-w-md mb-6">
            intellilearn empowers students with AI-powered question analysis, smart predictions, and personalized learning tools.
          </p>
          <button className="bg-yellow-400 px-5 py-3 rounded font-semibold hover:bg-yellow-500">
            Explore Features
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-blue-900 text-white grid grid-cols-1 md:grid-cols-3 text-center">
        {[
          { title: 'Smart Question Search', icon: '🔍' },
          { title: 'Detailed Solutions', icon: '🧠' },
          { title: 'Progress Insights', icon: '📊' },
        ].map((item, i) => (
          <div key={i} className="p-6 border-t md:border-r border-blue-700">
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-sm">Search, solve, and grow smarter every day.</p>
          </div>
        ))}
      </section>

      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row items-center p-10 bg-white">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Welcome to Intellilearn</h2>
          <p className="text-gray-700 mb-4">
            Intellilearn is designed to boost your exam prep with smart tools, personalized progress tracking, and a massive collection of solved questions.
          </p>
          <p className="text-gray-600 text-sm">
            Whether you're preparing for school, university, or competitive exams, we’ve got everything you need – in one place.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/studygroup.jpg" alt="Students studying" className="rounded shadow" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
