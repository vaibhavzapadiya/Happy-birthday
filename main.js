// Example API URL
const apiUrl = 'https://your-api-url.com/empcore';

// Fetch API data
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('employee-container');

    // Loop through the emplohhyee data and create cards
    data.forEach(employee => {
      // Create card element
      const card = document.createElement('div');
      card.classList.add('employee-card'); // Add a class for styling

      // Card content
      card.innerHTML = `
        <h2>${employee.name}</h2>
        <p><strong>Leave Days:</strong> ${employee.leaveDays}</p>
        <p><strong>Present Days:</strong> ${employee.presentDays}</p>
      `;

      // Append the card to the container
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching employee data:', error);
  });