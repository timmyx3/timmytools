document.getElementById("debtForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const item = document.getElementById("item").value.trim();
  const direction = document.getElementById("direction").value;

  if (!name || !item) return;

  const debtList = document.getElementById("debtList");

  const entry = document.createElement("div");
  entry.className = "p-4 bg-gray-50 border rounded-md shadow-sm";

  const message =
    direction === "them"
      ? `You owe <strong>${name}</strong>: ${item}`
      : `<strong>${name}</strong> owes you: ${item}`;

  entry.innerHTML = message;

  debtList.appendChild(entry);

  this.reset();
});
