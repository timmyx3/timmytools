import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

// The main App component for our Churn Report form.
const App = () => {
  // State variables for each form field.
  const [store, setStore] = useState('');
  const [reason, setReason] = useState('');
  const [leavingTo, setLeavingTo] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // A list of genders to populate the dropdown.
  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  // Handle the form submission.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Basic validation to ensure required fields are filled.
    if (!store || !reason || !leavingTo || !gender || !age) {
      setError('Please fill in all required fields.');
      return;
    }

    // Reset error message.
    setError('');

    // Create an object with the form data.
    const formData = {
      store,
      reason,
      leavingTo,
      gender,
      age: parseInt(age, 10), // Parse age as an integer.
      nationality,
      otherNotes,
    };

    // Log the data to the console to simulate a successful submission.
    // In a real application, this is where you would make an API call to a backend service
    // that would then write this data to your Google Sheet.
    console.log('Submitting Churn Report:', formData);

    // Set the submission success flag to true.
    setIsSubmitted(true);

    // Clear the form fields after a successful submission.
    setStore('');
    setReason('');
    setLeavingTo('');
    setGender('');
    setAge('');
    setNationality('');
    setOtherNotes('');

    // Hide the success message after a few seconds.
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
        {/* Title of the form */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Churn Report
        </h1>

        {/* Success message popup */}
        {isSubmitted && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md mb-6 transition-opacity duration-300">
            <p className="font-semibold text-center">Report submitted successfully! (Data logged to console)</p>
          </div>
        )}

        {/* Error message popup */}
        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md mb-6 transition-opacity duration-300">
            <p className="font-semibold text-center">{error}</p>
          </div>
        )}

        {/* The main form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store field */}
          <div>
            <label htmlFor="store" className="block text-sm font-medium text-gray-700">
              Store <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="store"
                name="store"
                type="text"
                required
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
                placeholder="e.g., City Center Branch"
              />
            </div>
          </div>

          {/* Reason field */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <textarea
                id="reason"
                name="reason"
                rows="3"
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
                placeholder="Describe the reason for the customer leaving..."
              ></textarea>
            </div>
          </div>

          {/* Leaving to Company field */}
          <div>
            <label htmlFor="leavingTo" className="block text-sm font-medium text-gray-700">
              Leaving to Company <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="leavingTo"
                name="leavingTo"
                type="text"
                required
                value={leavingTo}
                onChange={(e) => setLeavingTo(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
                placeholder="e.g., Competitor XYZ"
              />
            </div>
          </div>

          {/* Customer Gender field */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Customer Gender <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <select
                id="gender"
                name="gender"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
              >
                <option value="" disabled>Select a gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Age Estimate field */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age Estimate <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
                placeholder="e.g., 35"
              />
            </div>
          </div>

          {/* Nationality field */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <div className="mt-1">
              <input
                id="nationality"
                name="nationality"
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
                placeholder="e.g. Chinese "
              />
            </div>
          </div>

          {/* Other Notes field */}
          <div>
            <label htmlFor="otherNotes" className="block text-sm font-medium text-gray-700">
              Other Notes
            </label>
            <div className="mt-1">
              <textarea
                id="otherNotes"
                name="otherNotes"
                rows="4"
                value={otherNotes}
                onChange={(e) => setOtherNotes(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition duration-150 ease-in-out"
                placeholder="Any additional information..."
              ></textarea>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-5">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// This is a standard way to export a React component.
export default App;
