import React from "react";
import { FaUser, FaChalkboardTeacher, FaChartPie, FaSignOutAlt, FaBookOpen, FaCogs, FaLifeRing } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Link } from 'react-router-dom';

const data = [
  { name: "Offline", value: 120 },
  { name: "Online", value: 60 }
];

const COLORS = ["#FF8042", "#00C49F"];

const Sidebar = () => (
  <div className="w-64 bg-indigo-900 text-white min-h-screen rounded-r-3xl p-6 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3 mb-10">
        <img src="https://i.pravatar.cc/80" className="rounded-full w-14 h-14" alt="avatar" />
        <div>
          <p className="text-lg font-bold">Ajmer Thakur</p>
          <p className="text-sm text-indigo-300">thakurajmer@gmail.com</p>
        </div>
      </div>
      <nav className="space-y-5">
        <NavItem icon={<FaUser />} label="Dashboard" />
        <NavItem icon={<FaBookOpen />} label="Courses" />
        <NavItem icon={<FaChartPie />} label="Reports" />
        <NavItem icon={<FaChalkboardTeacher />} label="Teachers" />
      </nav>
      <div className="mt-10 border-t border-indigo-700 pt-6 space-y-4">
        <NavItem icon={<FaCogs />} label="Settings" />
        <NavItem icon={<FaLifeRing />} label="Help Center" />
        <Link to="/profileedit"><NavItem label="🖋 Edit Profile" /></Link>
      </div>
    </div>
    <button className="flex items-center gap-3 text-red-400 hover:text-red-500">
      <FaSignOutAlt /> Log Out
    </button>
  </div>
);

const NavItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-black-200 hover:text-black cursor-pointer">
    {icon} <span>{label}</span>
  </div>
);

const ProfileDashboard = () => {
  return (
    <div className="flex bg-gradient-to-br from-white-50 to-black min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 overflow-y-auto">
        <section className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-9 shadow-md">
            <h2 className="font-bold text-xl mb-7">Profile Info</h2>
            <img src="https://ih1.redbubble.net/image.586264322.4706/clk3q,bamboo,white,1000x-c,115,0,675,900.u3.jpg" alt="profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
            <p className="text-center font-semibold">Ajmer thakur</p>
            <p className="text-center text-sm text-gray-500">28 December 2004</p>
            <p className="text-center text-sm text-gray-500">SMP Harapan</p>
            <p className="text-center text-xs text-gray-400 mt-2">Jl. Cisadane 8, Cip. Tanggerang</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-xl mb-4">Study Time</h2>
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="flex justify-around mt-4 text-sm">
              <span className="text-orange-500">Offline</span>
              <span className="text-teal-500">Online</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h2 className="font-bold text-xl mb-4">Current Courses</h2>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between border-b pb-1">
                <span>Math Course</span>
                <span className="text-xs text-gray-400">Mar 2023</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Japanese Language</span>
                <span className="text-xs text-gray-400">Mar - Jun 2023</span>
              </li>
              <li className="flex justify-between">
                <span>English Course</span>
                <span className="text-xs text-gray-400">Feb - Apr 2023</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileDashboard;
