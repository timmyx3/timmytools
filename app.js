document.getElementById("churnForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const store = document.getElementById("store").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const leavingTo = document.getElementById("leavingTo").value.trim();
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value.trim();
  const nationality = document.getElementById("nationality").value.trim();
  const otherNotes = document.getElementById("otherNotes").value.trim();

  const errorMsg = document.getElementById("errorMsg");
  const successMsg = document.getElementById("successMsg");

  if (!store || !reason || !leavingTo || !gender || !age) {
    errorMsg.innerText = "Please fill in all required fields.";
    errorMsg.classList.remove("hidden");
    successMsg.classList.add("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  const formData = {
    store,
    reason,
    leavingTo,
    gender,
    age: parseInt(age, 10),
    nationality,
    otherNotes,
  };

  console.log("Submitting Churn Report:", formData);

  successMsg.classList.remove("hidden");

  this.reset();

  setTimeout(() => {
    successMsg.classList.add("hidden");
  }, 5000);
});
