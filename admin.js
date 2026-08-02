const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first!");
    window.location.href = "login.html";
}
async function loadMessages(){

    const response = await fetch("http://localhost:5001/api/messages");

    const data = await response.json();

    const table = document.getElementById("messageTable");

    table.innerHTML = "";

    data.forEach(msg => {

        table.innerHTML += `
        <tr>
            <td>${msg.name}</td>
            <td>${msg.email}</td>
            <td>${msg.message}</td>
           <td>${new Date(msg.createdAt).toLocaleString()}</td>

<td>
<button onclick="deleteMessage('${msg._id}')">
Delete
</button>
</td>
        </tr>
        `;

    });

}

loadMessages();
async function deleteMessage(id) {
  if (!confirm("Delete this message?")) return;

  const response = await fetch(`http://localhost:5001/api/messages/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  alert(data.message);

  loadMessages();
}
function logout() {
    localStorage.removeItem("token");
    alert("Logged Out Successfully");
    window.location.href = "login.html";
}