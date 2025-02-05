// Fetch certificates from the JSON file
const certificatesUrl = 'certificates.json';
let certificates = [];
let currentPage = 1;
const certificatesPerPage = 10;

fetch(certificatesUrl)
    .then(response => response.json())
    .then(data => {
        certificates = data;
        displayCertificates();
        setupPagination();
    })
    .catch(error => console.error('Error fetching certificates:', error));

// Function to display certificates on the page
function displayCertificates() {
    const startIndex = (currentPage - 1) * certificatesPerPage;
    const endIndex = startIndex + certificatesPerPage;
    const certificatesToDisplay = certificates.slice(startIndex, endIndex);

    const listContainer = document.getElementById('certificates-list');
    listContainer.innerHTML = ''; // Clear the list

    const ul = document.createElement('ul');
    certificatesToDisplay.forEach(cert => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = `certificates/${cert}`;
        link.target = '_blank';
        link.innerText = cert;
        li.appendChild(link);
        ul.appendChild(li);
    });

    listContainer.appendChild(ul);
    document.getElementById('page-number').innerText = `Page ${currentPage}`;
}

// Function to setup pagination buttons
function setupPagination() {
    const totalPages = Math.ceil(certificates.length / certificatesPerPage);

    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');

    // Disable Previous button on the first page
    prevButton.disabled = currentPage === 1;

    // Disable Next button on the last page
    nextButton.disabled = currentPage === totalPages;

    prevButton.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayCertificates();
        }
    };

    nextButton.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCertificates();
        }
    };
}
