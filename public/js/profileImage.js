document.getElementById('picture-upload').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', () => {
    const formData = new FormData(document.getElementById('uploadForm'));
    fetch('/user/upload', { // Ensure the correct endpoint path
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                alert('Profile picture uploaded successfully.');
                location.reload(); // Refresh to show the new picture
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to upload profile picture.');
                });
            }
        })
        .catch(error => {
            alert(`Error: ${error.message}`);
            console.error('Error:', error);
        });
});