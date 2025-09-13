import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link here

const ProfilePage = () => {
  const [photo, setPhoto] = useState('https://via.placeholder.com/100');

  const student = {
    name: 'Alina Bermesoni',
    email: 'alina.bermesoni@gmail.com',
    phone: '+00 000-000-000',
    city: 'New York',
    country: 'USA',
    location: 'Brooklyn',
    education: 'B.Sc. Computer Science, NYU',
    languages: ['German', 'English'],
    skills: ['React', 'Node.js', 'CSS', 'Problem Solving'],
    achievements: [
      'Dean’s List 2023',
      'Hackathon Winner – CodeFest 2022',
      'Published research on AI ethics'
    ],
    about: 'Passionate about technology and computer science. Loves to explore new frameworks and solve complex problems.',
    social: {
      linkedin: 'https://linkedin.com/in/alina-bermesoni',
      github: 'https://github.com/alina-bermesoni'
    }
  };

  const handleEdit = () => {
    alert('Edit profile functionality to be implemented');
  };

  const handleLogout = () => {
    alert('Logout functionality to be implemented');
  };

  const handleBack = () => {
    window.history.back();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPhoto(imgUrl);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-black text-white font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-black to-gray-800 shadow-lg p-6">
        <div className="flex items-center mb-8">
          <img src="https://via.placeholder.com/40" alt="Logo" className="w-8 h-8 mr-3" />
          <h2 className="text-xl font-bold text-blue-500">Student Profile</h2>
        </div>
        <nav className="space-y-4">
          <a href="#" className="block p-3 rounded-lg hover:bg-gray-700 transition transform hover:scale-105">Home</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-gray-700 transition transform hover:scale-105">Events</a>
          <a href="#" className="block p-3 rounded-lg hover:bg-gray-700 transition transform hover:scale-105">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={photo}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-lg object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded cursor-pointer opacity-80 hover:opacity-100 transition"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-500">{student.name}</h1>
              <p className="text-gray-400">{student.email}</p>
              <p className="text-gray-400">{student.phone}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleBack}
              className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transform hover:scale-105 transition shadow-md"
            >
              Back
            </button>
            <Link to="/profileedit">
              <button
                onClick={handleEdit}
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transform hover:scale-105 transition shadow-md"
              >
                Edit
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transform hover:scale-105 transition shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* About Me */}
        <div className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-blue-600/50 transition-shadow">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">About Me</h2>
          <p className="text-gray-300">{student.about}</p>
        </div>

        {/* Details */}
        <div className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-blue-600/50 transition-shadow">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Details</h2>
          <div className="grid grid-cols-2 gap-6 text-gray-300">
            <div>
              <p className="text-gray-500 text-sm">City</p>
              <p>{student.city}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Country</p>
              <p>{student.country}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p>{student.location}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Education</p>
              <p>{student.education}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-blue-600/50 transition-shadow">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {student.skills.map((skill, index) => (
              <span key={index} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-500 transition">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-blue-600/50 transition-shadow">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Achievements</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {student.achievements.map((achieve, index) => (
              <li key={index}>{achieve}</li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-blue-600/50 transition-shadow">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Languages</h2>
          <div className="flex flex-wrap gap-3">
            {student.languages.map((lang, index) => (
              <span key={index} className="bg-gray-800 text-white px-4 py-1 rounded-full text-sm hover:bg-gray-700 transition">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gradient-to-r from-black to-gray-800 border border-gray-700 rounded-xl shadow-lg p-6 hover:shadow-blue-600/50 transition-shadow">
          <h2 className="text-xl font-semibold text-blue-500 mb-4">Contact Info</h2>
          <div className="flex gap-4">
            <a
              href={student.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg shadow-md"
            >
              LinkedIn
            </a>
            <a
              href={student.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg shadow-md"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
