/**
 * Debt Form Submission Handler
 * Sends data to a Google Apps Script (GAS) endpoint and displays user feedback.
 */

// DOM Elements
const debtForm = document.getElementById('debtForm');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');

// Google Apps Script Endpoint (Replace with your URL)
const API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

// Timeout reference for hiding success message
let successTimeout = null;

// Form Submission Handler
debtForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous messages and timeouts
  errorMsg.classList.add('hidden');
  successMsg.classList.add('hidden');
  if (successTimeout) clearTimeout(successTimeout);

  // Get form values
  const to = document.getElementById('to').value.trim();
  const item = document.getElementById('item').value.trim();
  const amount = document.getElementById('amount').value.trim() || '0'; // Default to '0' if empty

  // Validate required fields
  if (!to || !item) {
    showError('Please fill in all required fields (To and Item).');
    return;
  }

  // Prepare data for API
  const data = { to, item, amount };

  try {
    // Send data to Google Apps Script
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle non-OK responses (e.g., 404, 500)
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }

    // Parse JSON response
    const result = await response.json();

    // Check for success message from GAS
    if (result.result === 'success') {
      showSuccess('Debt record saved successfully!');
      debtForm.reset();
    } else {
      throw new Error(result.error || 'Unknown server error');
    }
  } catch (error) {
    console.error('Submission error:', error);
    showError(`Failed to save: ${error.message}`);
  }
});

/**
 * Displays a success message that auto-hides after 4 seconds.
 * @param {string} message - The success message to display.
 */
function showSuccess(message) {
  successMsg.textContent = message;
  successMsg.classList.remove('hidden');
  successTimeout = setTimeout(() => {
    successMsg.classList.add('hidden');
  }, 4000);
}

/**
 * Displays an error message.
 * @param {string} message - The error message to display.
 */
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove('hidden');
}
