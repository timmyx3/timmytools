<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Who Owes Who</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
  <div class="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
    <a href="index.html" class="text-sm text-green-600 hover:underline block mb-4">← Back to Home</a>
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">💸 Who Owes Who</h1>

    <form id="debtForm" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input id="name" type="text" required class="block w-full p-3 border rounded-md" placeholder="e.g., Alex" />
      </div>

      <div>
        <label for="item" class="block text-sm font-medium text-gray-700">What’s owed</label>
        <input id="item" type="text" required class="block w-full p-3 border rounded-md" placeholder="e.g., Dinner" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Direction</label>
        <select id="direction" required class="block w-full p-3 border rounded-md">
          <option value="them">I owe them</option>
          <option value="me">They owe me</option>
        </select>
      </div>

      <div class="md:col-span-3">
        <button type="submit" class="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
          ➕ Add Entry
        </button>
      </div>
    </form>

    <hr class="mb-4">

    <div id="debtList" class="space-y-3">
      <!-- Entries will appear here -->
    </div>
  </div>

  <script src="js/second-tool.js" defer></script>
</body>
</html>
