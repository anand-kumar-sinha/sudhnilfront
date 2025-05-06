export const Section = ({ title, children }) => (
  <section className="bg-white shadow-lg rounded-2xl p-6 space-y-4 transform transition-all duration-300 hover:shadow-xl">
    <div className="text-2xl font-semibold text-gray-700 border-b pb-2">
      {title}
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

export const Input = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && (
      <p className="text-red-500 text-xs mt-1 whitespace-pre-wrap break-all">
        {error}
      </p>
    )}
  </div>
);

export const Button = ({ label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.03] ${
      danger ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
    }`}
  >
    {label}
  </button>
);

export const Switch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
        <div
          className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        ></div>
      </div>
    </label>
  </div>
);
