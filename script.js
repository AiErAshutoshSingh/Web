document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const groupFile = document.getElementById('group-csv').files[0];
    const hostelFile = document.getElementById('hostel-csv').files[0];

    const formData = new FormData();
    formData.append('groupFile', groupFile);
    formData.append('hostelFile', hostelFile);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
        createDownloadLink(data);
    })
    .catch(error => console.error('Error:', error));
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Room Allocation</h2>';
    data.forEach(allocation => {
        resultsDiv.innerHTML += `<p>Group ID: ${allocation.groupId}, Hostel: ${allocation.hostelName}, Room: ${allocation.roomNumber}, Members Allocated: ${allocation.membersAllocated}</p>`;
    });
}

function createDownloadLink(data) {
    const csvContent = "data:text/csv;charset=utf-8," 
        + data.map(e => `${e.groupId},${e.hostelName},${e.roomNumber},${e.membersAllocated}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.getElementById('download-link');
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "room_allocation.csv");
    link.style.display = 'block';
}
