import React, { useState } from 'react';

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 p-8 rounded-t-3xl">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-sm text-gray-300 mt-1">Customize your personal and professional info</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

          {/* Left - Profile Image */}
          <div className="flex flex-col items-center p-6">
            <div className="relative group">
              <div className="w-40 h-40 bg-gray-800 rounded-full overflow-hidden flex items-center justify-center border-4 border-purple-600">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm">
                Upload
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="mt-4 text-sm text-gray-400">Click above to upload photo</p>
          </div>

          {/* Middle - Profile Info */}
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-6">Personal Info</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="First Name"
              />
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="Surname"
              />
            </div>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition mt-4"
              placeholder="Phone Number"
            />
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition mt-4"
              placeholder="Email Address"
            />
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition mt-4"
              placeholder="Full Address"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="Country"
              />
              <input
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
                placeholder="State/Region"
              />
            </div>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition mt-4"
              placeholder="Education"
            />
          </div>

          {/* Right - Experience */}
          <div className="p-8">
            <h2 className="text-xl font-semibold mb-6">Experience</h2>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              placeholder="Experience in Designing"
            />
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition mt-4"
              placeholder="Additional Details"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl transition">
                Back
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6 py-2 rounded-xl transition font-semibold">
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
