import React from 'react'


const SettingSideBard = ({isDrawerOpen, setIsDrawerOpen, sections, activeSection, setActiveSection}) => {
  return (
    <div
    className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
      isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:relative lg:z-auto`}
  >
    <div className="flex justify-between items-center p-4 lg:hidden">
      <span className="text-lg font-semibold text-gray-700">Settings</span>
      <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500 text-xl">
        ✕
      </button>
    </div>
    <div className="space-y-4 p-4">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => {
            setActiveSection(section.id);
            setIsDrawerOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-3 rounded-xl text-left font-medium text-gray-700 hover:bg-blue-100 transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
            activeSection === section.id ? 'bg-blue-200' : ''
          }`}
        >
          {section.icon} {section.label}
        </button>
      ))}
    </div>
  </div>
  )
}

export default SettingSideBard
