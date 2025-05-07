import React, { useState } from "react";
import { Plus, MapPin, Trash2, Pencil } from "lucide-react";
import AddressDialog from "../components/AddressDialog"; // Make sure path is correct

const initialAddresses = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main Street, Springfield, IL, 62704",
    phone: "(555) 123-4567",
    isDefault: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "456 Elm Street, Chicago, IL, 60601",
    phone: "(555) 987-6543",
    isDefault: false,
  },
];

export default function AddressPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ✅ Add this

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="text-gray-700" /> Saved Addresses
        </h1>
        <button
          onClick={() => setIsDialogOpen(true)} // ✅ Open dialog on click
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <Plus size={16} /> Add Address
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 border rounded-xl shadow-sm ${
              addr.isDefault ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {addr.name}
                </h2>
                <p className="text-sm text-gray-600 mb-1">{addr.address}</p>
                <p className="text-sm text-gray-600">Phone: {addr.phone}</p>
                {addr.isDefault && (
                  <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                    Default Address
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-blue-600">
                  <Pencil size={18} />
                </button>
                <button className="text-gray-500 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Add the dialog here */}
      <AddressDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </div>
  );
}
