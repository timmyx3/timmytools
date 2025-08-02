const debtForm = document.getElementById('debtForm');
const successMsg = document.getElementById('successMsg');
const errorMsg = document.getElementById('errorMsg');

const API_URL = 'https://script.google.com/macros/s/AKfycbwFpuJA31UTFyVGYr4_WKF1cUqtjKecu68U5xORJPModeDSZwy5yRdH_-74m2IGnGAV/exec';

debtForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  const item = document.getElementById('item').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if (!from || !to || !item) {
    errorMsg.innerText = 'Please fill in all required fields.';
    errorMsg.classList.remove('hidden');
    successMsg.classList.add('hidden');
    return;
  }

  errorMsg.classList.add('hidden');

  const data = { from, to, item, amount };

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(result => {
    if (result.result === 'success') {
      successMsg.classList.remove('hidden');
      errorMsg.classList.add('hidden');
      debtForm.reset();

      setTimeout(() => {
        successMsg.classList.add('hidden');
      }, 4000);
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  })
  .catch(error => {
    errorMsg.innerText = 'Failed to save debt record: ' + error.message;
    errorMsg.classList.remove('hidden');
    successMsg.classList.add('hidden');
  });
});
