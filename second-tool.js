const form = document.getElementById("debtForm");
const debtList = document.getElementById("debtList");

let debts = [];

// Load from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("debts");
  if (saved) {
    debts = JSON.parse(saved);
    renderDebts();
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const itemInput = document.getElementById("item");
  const directionInput = document.getElementById("direction");

  const name = nameInput.value.trim();
  const item = itemInput.value.trim();
  const direction = directionInput.value;

  if (!name || !item) return;

  // Add new debt entry with a unique id (timestamp)
  debts.push({
    id: Date.now(),
    name,
    item,
    direction,
  });

  saveAndRender();

  form.reset();
});

function saveAndRender() {
  localStorage.setItem("debts", JSON.stringify(debts));
  renderDebts();
}

function renderDebts() {
  debtList.innerHTML = "";

  debts.forEach((debt) => {
    const div = document.createElement("div");
    div.className = "p-4 bg-gray-50 border rounded-md shadow-sm flex justify-between items-center";

    // Text display div (or inputs if editing)
    const textDiv = document.createElement("div");
    textDiv.className = "flex-1";

    // Edit mode flag, start false
    let editing = false;

    function updateText() {
      textDiv.innerHTML =
        debt.direction === "them"
          ? `You owe <strong>${escapeHtml(debt.name)}</strong>: ${escapeHtml(debt.item)}`
          : `<strong>${escapeHtml(debt.name)}</strong> owes you: ${escapeHtml(debt.item)}`;
    }

    updateText();

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className = "ml-4 space-x-2 flex-shrink-0";

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "text-blue-600 hover:underline";
    editBtn.textContent = "Edit";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "text-red-600 hover:underline";
    deleteBtn.textContent = "Delete";

    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    div.appendChild(textDiv);
    div.appendChild(buttonsDiv);

    debtList.appendChild(div);

    editBtn.addEventListener("click", () => {
      if (!editing) {
        // Switch to edit mode: replace textDiv content with inputs
        editing = true;
        editBtn.textContent = "Save";

        textDiv.innerHTML = `
          <input type="text" class="border rounded p-1 mr-2" value="${escapeHtml(debt.name)}" id="edit-name-${debt.id}" />
          <input type="text" class="border rounded p-1 mr-2" value="${escapeHtml(debt.item)}" id="edit-item-${debt.id}" />
          <select class="border rounded p-1" id="edit-direction-${debt.id}">
            <option value="them" ${debt.direction === "them" ? "selected" : ""}>I owe them</option>
            <option value="me" ${debt.direction === "me" ? "selected" : ""}>They owe me</option>
          </select>
        `;
      } else {
        // Save edits
        const newName = document.getElementById(`edit-name-${debt.id}`).value.trim();
        const newItem = document.getElementById(`edit-item-${debt.id}`).value.trim();
        const newDirection = document.getElementById(`edit-direction-${debt.id}`).value;

        if (!newName || !newItem) {
          alert("Name and Item cannot be empty.");
          return;
        }

        debt.name = newName;
        debt.item = newItem;
        debt.direction = newDirection;

        editing = false;
        editBtn.textContent = "Edit";

        updateText();
        saveAndRender();
      }
    });

    deleteBtn.addEventListener("click", () => {
      if (confirm("Delete this entry?")) {
        debts = debts.filter((d) => d.id !== debt.id);
        saveAndRender();
      }
    });
  });
}

// Utility: escape HTML for safety
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
