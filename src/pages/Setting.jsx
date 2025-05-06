import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Download,
  Globe,
  Trash2,
} from "lucide-react";
import SettingSideBard from "../components/SettingSideBard";
import { Input, Section, Switch, Button } from "../components/SettingOther";

const Setting = () => {
  const sections = [
    { id: "account", label: "Account Info", icon: <User /> },
    { id: "password", label: "Change Password", icon: <Lock /> },
    { id: "notifications", label: "Notifications", icon: <Bell /> },
    { id: "privacy", label: "Privacy", icon: <Shield /> },
    { id: "subscriptions", label: "Subscriptions", icon: <Bell /> },
    { id: "data", label: "Download Data", icon: <Download /> },
    { id: "language", label: "Language & Region", icon: <Globe /> },
    { id: "deactivate", label: "Deactivate Account", icon: <Trash2 /> },
  ];

  const [activeSection, setActiveSection] = useState("account");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    newPassword: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });
  const [privacy, setPrivacy] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState(true);
  const [subscribeSMS, setSubscribeSMS] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleSwitch = (section, key) => {
    if (section === "notifications")
      setNotifications({ ...notifications, [key]: !notifications[key] });
    if (section === "privacy") setPrivacy(!privacy);
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

    if (!name) errors.name = "Name field is required!";
    if (!email) errors.email = "Email field is required!";
    else if (!emailPattern.test(email))
      errors.email = "Please enter a valid email address!";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    alert("Account updated successfully!");
  };

  const handlePasswordChange = () => {
    const { newPassword } = formData;
    const rules = passwordRulesCheck(newPassword);

    if (!validatePassword(newPassword)) {
      const message = [
        `${rules.uppercase ? "✔" : "✖"} A-Z`,
        `${rules.lowercase ? "✔" : "✖"} a-z`,
        `${rules.number ? "✔" : "✖"} 0-9`,
        `${rules.specialChar ? "✔" : "✖"} !@#$%^&*`,
        `${rules.length ? "✔" : "✖"} 8–13 chars`,
      ].join(" | ");

      setFormErrors((prev) => ({ ...prev, newPassword: message }));
      return;
    }

    setFormErrors((prev) => ({ ...prev, newPassword: "" }));
    alert("Password changed!");
  };

  const handleDownloadUserData = () => alert("Downloading your data...");
  const handleDeactivateAccount = () =>
    window.confirm("Are you sure you want to deactivate your account?") &&
    alert("Account deactivated.");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 transition-colors duration-300 ease-in-out relative">
      {/* Mobile Hamburger */}
      <div className="lg:hidden p-4">
        <button className="text-gray-700" onClick={() => setIsDrawerOpen(true)}>
          ☰ Menu
        </button>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsDrawerOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <SettingSideBard
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 p-6 space-y-8 z-10">
        {activeSection === "account" && (
          <Section title="Account Info">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={formErrors.name}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={formErrors.email}
            />
            <Button label="Update Info" onClick={handleAccountUpdate} />
          </Section>
        )}

        {activeSection === "password" && (
          <Section title="Change Password">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleInputChange}
            />
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleInputChange}
              error={formErrors.newPassword}
            />
            <Button label="Change Password" onClick={handlePasswordChange} />
          </Section>
        )}

        {activeSection === "notifications" && (
          <Section title="Notifications">
            <Switch
              label="Email Notifications"
              checked={notifications.email}
              onChange={() => toggleSwitch("notifications", "email")}
            />
            <Switch
              label="SMS Alerts"
              checked={notifications.sms}
              onChange={() => toggleSwitch("notifications", "sms")}
            />
          </Section>
        )}

        {activeSection === "privacy" && (
          <Section title="Privacy">
            <Switch
              label="Make Profile Private"
              checked={privacy}
              onChange={() => toggleSwitch("privacy")}
            />
            <Switch
              label="Two-Factor Authentication (2FA)"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
          </Section>
        )}

        {activeSection === "subscriptions" && (
          <Section title="Subscriptions">
            <Switch
              label="Receive Promotional Emails"
              checked={subscribeEmail}
              onChange={() => setSubscribeEmail(!subscribeEmail)}
            />
            <Switch
              label="Receive SMS Offers"
              checked={subscribeSMS}
              onChange={() => setSubscribeSMS(!subscribeSMS)}
            />
          </Section>
        )}

        {activeSection === "data" && (
          <Section title="Download Your Data">
            <Button label="Download My Data" onClick={handleDownloadUserData} />
          </Section>
        )}

        {activeSection === "language" && (
          <Section title="Language & Region">
            <label className="block text-sm text-gray-600 mb-1">Language</label>
            <select
              className="w-full p-2 rounded border"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
            </select>
          </Section>
        )}

        {activeSection === "deactivate" && (
          <Section title="Account Control">
            <Button
              label="Deactivate Account"
              onClick={handleDeactivateAccount}
              danger
            />
          </Section>
        )}
      </main>
    </div>
  );
};



export default Setting;
