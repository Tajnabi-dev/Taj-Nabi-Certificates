document.addEventListener("DOMContentLoaded", function () {
    alert("comiing");
    console.log("DOM loaded and parsed");
    fetch("certificates.json")
        .then(response => response.json())
        .then(certificates => {
            const tableBody = document.getElementById("certificate-list");
            tableBody.innerHTML = ""; // Clear existing content

            certificates.forEach((certificate, index) => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${certificate}</td>
                    <td><a href="certificates/${certificate}" class="view-btn" target="_blank">View</a></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading certificates:", error));
});
