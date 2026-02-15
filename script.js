// --- Family registration ---
async function registerFamily(formId) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      name: document.getElementById("name").value,
      prefAgeMin: parseInt(document.getElementById("prefAgeMin").value),
      prefAgeMax: parseInt(document.getElementById("prefAgeMax").value),
      bio: document.getElementById("bio").value
    };
    const res = await fetch("/api/families", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.success) alert("Registration submitted for verification!");
    form.reset();
  });
}

// --- Admin dashboard ---
async function loadPendingFamilies() {
  const res = await fetch("/api/families");
  const families = await res.json();
  const list = document.getElementById("pending-families");
  if(!list) return;
  list.innerHTML = families.filter(f => !f.verified)
    .map(f => `<li>${f.name} <button onclick="verifyFamily(${f.id})">Verify</button></li>`).join("");
}

async function verifyFamily(id) {
  await fetch(`/api/families/${id}/verify`, { method:"PUT" });
  loadPendingFamilies();
}

async function addChild(formId) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      name: document.getElementById("childName").value,
      age: parseInt(document.getElementById("childAge").value),
      needs: document.getElementById("childNeeds").value
    };
    const res = await fetch("/api/children", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if(result.success) alert("Child added!");
    form.reset();
  });
}
