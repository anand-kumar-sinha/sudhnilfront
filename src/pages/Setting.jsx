import React, { useState } from 'react';
import { User, Lock, Bell, Shield, Sun, Moon, Download, Globe, Trash2 } from 'lucide-react';

const Setting = () => {
  const sections = [
    { id: 'account', label: 'Account Info', icon: <User /> },
    { id: 'password', label: 'Change Password', icon: <Lock /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield /> },
    { id: 'subscriptions', label: 'Subscriptions', icon: <Bell /> },
    { id: 'data', label: 'Download Data', icon: <Download /> },
    { id: 'language', label: 'Language & Region', icon: <Globe /> },
    { id: 'appearance', label: 'Theme', icon: <Sun /> },
    { id: 'deactivate', label: 'Deactivate Account', icon: <Trash2 /> },
  ];

  const [activeSection, setActiveSection] = useState('account');
  const [formData, setFormData] = useState({ name: '', email: '', currentPassword: '', newPassword: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', newPassword: '' });
  const [notifications, setNotifications] = useState({ email: true, sms: false });
  const [privacy, setPrivacy] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState(true);
  const [subscribeSMS, setSubscribeSMS] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleSwitch = (section, key) => {
    if (section === 'notifications') setNotifications({ ...notifications, [key]: !notifications[key] });
    if (section === 'privacy') setPrivacy(!privacy);
    if (section === 'dark') {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle('dark');
    }
  };

  const passwordRulesCheck = (password) => ({
    length: password.length >= 8 && password.length <= 13,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*]/.test(password),
  });

  const validatePassword = (password) => {
    const rules = passwordRulesCheck(password);
    return Object.values(rules).every(Boolean);
  };

  const handleAccountUpdate = () => {
    const { name, email } = formData;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let errors = {};

    if (!name) errors.name = 'Name field is required!';
    if (!email) errors.email = 'Email field is required!';
    else if (!emailPattern.test(email)) errors.email = 'Please enter a valid email address!';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    alert('Account updated successfully!');
  };

  const handlePasswordChange = () => {
    const { newPassword } = formData;
    const rules = passwordRulesCheck(newPassword);

    if (!validatePassword(newPassword)) {
      const message = [
        `${rules.uppercase ? '✔' : '✖'} A-Z`,
        `${rules.lowercase ? '✔' : '✖'} a-z`,
        `${rules.number ? '✔' : '✖'} 0-9`,
        `${rules.specialChar ? '✔' : '✖'} !@#$%^&*`,
        `${rules.length ? '✔' : '✖'} 8–13 chars`
      ].join(' | ');

      setFormErrors((prev) => ({ ...prev, newPassword: message }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, newPassword: '' }));
    alert('Password changed!');
  };

  const handleDownloadUserData = () => alert('Downloading your data...');
  const handleDeactivateAccount = () => window.confirm('Are you sure you want to deactivate your account?') && alert('Account deactivated.');

  return (
    <div className="flex flex-col lg:flex-row min-h-screen transition-colors duration-300 ease-in-out">
      {/* Mobile Hamburger */}
      <div className="lg:hidden p-4">
        <button className="text-gray-700 dark:text-gray-200" onClick={() => setIsDrawerOpen(true)}>
          ☰ Menu
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 ${
        isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:relative lg:top-auto lg:left-auto`}>
        <div className="flex justify-between items-center p-4 lg:hidden">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Settings</span>
          <button onClick={() => setIsDrawerOpen(false)} className="text-gray-500 dark:text-gray-300 text-xl">✕</button>
        </div>
        <div className="space-y-4 p-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsDrawerOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                activeSection === section.id ? 'bg-blue-200 dark:bg-blue-900' : ''
              }`}
            >
              {section.icon} {section.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-950 space-y-8 transition-all duration-300 ease-in-out">
        {activeSection === 'account' && (
          <Section title="Account Info">
            <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} error={formErrors.name} />
            <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} error={formErrors.email} />
            <Button label="Update Info" onClick={handleAccountUpdate} />
          </Section>
        )}

        {activeSection === 'password' && (
          <Section title="Change Password">
            <Input label="Current Password" name="currentPassword" type="password" value={formData.currentPassword} onChange={handleInputChange} />
            <Input label="New Password" name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} error={formErrors.newPassword} />
            <Button label="Change Password" onClick={handlePasswordChange} />
          </Section>
        )}

        {activeSection === 'notifications' && (
          <Section title="Notifications">
            <Switch label="Email Notifications" checked={notifications.email} onChange={() => toggleSwitch('notifications', 'email')} />
            <Switch label="SMS Alerts" checked={notifications.sms} onChange={() => toggleSwitch('notifications', 'sms')} />
          </Section>
        )}

        {activeSection === 'privacy' && (
          <Section title="Privacy">
            <Switch label="Make Profile Private" checked={privacy} onChange={() => toggleSwitch('privacy')} />
            <Switch label="Two-Factor Authentication (2FA)" checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
          </Section>
        )}

        {activeSection === 'subscriptions' && (
          <Section title="Subscriptions">
            <Switch label="Receive Promotional Emails" checked={subscribeEmail} onChange={() => setSubscribeEmail(!subscribeEmail)} />
            <Switch label="Receive SMS Offers" checked={subscribeSMS} onChange={() => setSubscribeSMS(!subscribeSMS)} />
          </Section>
        )}

        {activeSection === 'data' && (
          <Section title="Download Your Data">
            <Button label="Download My Data" onClick={handleDownloadUserData} />
          </Section>
        )}

        {activeSection === 'language' && (
          <Section title="Language & Region">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Language</label>
            <select className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </Section>
        )}

        {activeSection === 'appearance' && (
          <Section title="Theme">
            <Switch label="Enable Dark Mode" checked={darkMode} onChange={() => toggleSwitch('dark')} />
          </Section>
        )}

        {activeSection === 'deactivate' && (
          <Section title="Account Control">
            <Button label="Deactivate Account" onClick={handleDeactivateAccount} danger />
          </Section>
        )}
      </main>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 space-y-4 transform transition-all duration-300 hover:shadow-xl">
    <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">{title}</div>
    <div className="space-y-4">{children}</div>
  </section>
);

const Input = ({ label, name, value, onChange, error, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 rounded border dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-red-500 text-xs mt-1 whitespace-pre-wrap break-all">{error}</p>}
  </div>
);

const Button = ({ label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-white transition-all duration-200 transform hover:scale-[1.03] ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
  >
    {label}
  </button>
);

const Switch = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
        <div className={`absolute w-5 h-5 bg-white rounded-full shadow transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}></div>
      </div>
    </label>
  </div>
);

export default Setting;
