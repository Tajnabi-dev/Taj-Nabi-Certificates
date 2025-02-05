const certificatesPerPage = 10;
    let currentPage = 1;
    let certificates = [];

    // Fetch the JSON data and display it dynamically
    fetch('certificates.json')
      .then(response => response.json())
      .then(data => {
        certificates = data;
        displayCertificates(currentPage);
      })
      .catch(error => console.error('Error fetching certificates:', error));

    // Function to display certificates based on the current page
    function displayCertificates(page) {
      const start = (page - 1) * certificatesPerPage;
      const end = start + certificatesPerPage;
      const paginatedCertificates = certificates.slice(start, end);

      const tableBody = document.getElementById('certificate-list');
      tableBody.innerHTML = ''; // Clear the table before adding new rows

      paginatedCertificates.forEach((certificate, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${start + index + 1}</td>
          <td>${certificate.name}</td>
          <td><a href="${certificate.link}" target="_blank">View</a></td>
        `;
        tableBody.appendChild(row);
      });

      // Enable or disable pagination buttons
      document.getElementById('prevPage').classList.toggle('disabled', currentPage === 1);
      document.getElementById('nextPage').classList.toggle('disabled', currentPage * certificatesPerPage >= certificates.length);
    }

    // Function to change pages
    function changePage(direction) {
      currentPage += direction;
      displayCertificates(currentPage);
    }
