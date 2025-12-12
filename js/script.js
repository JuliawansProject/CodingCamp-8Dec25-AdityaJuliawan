// ambil elemen
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteBtn = document.getElementById("deleteBtn");
const filterBtn = document.getElementById("filterBtn");
const tableBody = document.getElementById("taskTable");

// array penyimpan data
let tasks = [];
let filterMode = "all"; // all | done | pending

// Event listener tombol ADD
addBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;

  if (taskText === "" || taskDate === "") {
    alert("Please fill all inputs");
    return;
  }

  // buat object task baru
  const newTask = {
    id: Date.now(),
    text: taskText,
    date: taskDate,
    status: "pending"
  };

  tasks.push(newTask);
  renderTable();
  taskInput.value = "";
  dateInput.value = "";
});

// Render tabel
function renderTable() {
  tableBody.innerHTML = "";

  let filteredTasks = tasks;

  // filter
  if (filterMode === "done") {
    filteredTasks = tasks.filter(t => t.status === "done");
  } else if (filterMode === "pending") {
    filteredTasks = tasks.filter(t => t.status === "pending");
  }

  // tampilkan setiap task
  filteredTasks.forEach(task => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="border p-2">${task.text}</td>
      <td class="border p-2">${task.date}</td>
      <td class="border p-2">
        <button class="px-2 py-1 rounded text-white ${
          task.status === "done" ? "bg-green-600" : "bg-yellow-500"
        }" onclick="toggleStatus(${task.id})">
          ${task.status}
        </button>
      </td>
      <td class="border p-2">
        <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// ubah status (done/pending)
function toggleStatus(id) {
  tasks = tasks.map(task =>
    task.id === id
      ? { ...task, status: task.status === "pending" ? "done" : "pending" }
      : task
  );
  renderTable();
}

// hapus task satu baris
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTable();
}

// Hapus semua task
deleteBtn.addEventListener("click", function () {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    renderTable();
  }
});

// Filter
filterBtn.addEventListener("click", function () {
  if (filterMode === "all") filterMode = "done";
  else if (filterMode === "done") filterMode = "pending";
  else filterMode = "all";

  filterBtn.textContent = "Filter: " + filterMode;
  renderTable();
});

// pertama kali render
renderTable();
