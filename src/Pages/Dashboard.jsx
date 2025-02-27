import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [qrData, setQrData] = useState("");
  const [inputData, setInputData] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  // Function to handle form submission and generate QR code
  const handleGenerate = (e) => {
    e.preventDefault();
    if (!inputData) {
      toast.error("Please enter data to generate a QR code");
      return;
    }
    setQrData(inputData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        {/* Form for QR Code Generation */}
        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Data Input Field */}
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
            placeholder="Enter data for QR code"
          />

          {/* Foreground and Background Color Pickers */}
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700 mb-1">
                Foreground Color:
              </label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-12 h-12 p-0 border-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">
                Background Color:
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-12 h-12 p-0 border-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Generate QR Code
          </button>
        </form>

        {/* Display QR Code if available */}
        {qrData && (
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Your QR Code:</h2>
            <QRCodeCanvas
              value={qrData}
              fgColor={fgColor}
              bgColor={bgColor}
              size={256}
            />
            <p className="mt-4 text-gray-600">
              Data: <span className="font-mono">{qrData}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
