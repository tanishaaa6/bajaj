document.getElementById('submitBtn').addEventListener('click', function() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownContainer = document.getElementById('dropdownContainer');
    const responseContainer = document.getElementById('responseContainer');
    const responseOutput = document.getElementById('responseOutput');
    
    try {
        // Validate JSON input
        const parsedJson = JSON.parse(jsonInput);

        // Make the API call
        fetch('http://<ngrok-id>.ngrok.io/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedJson)
        })
        .then(response => response.json())
        .then(data => {
            // Show the dropdown and response container
            dropdownContainer.classList.remove('hidden');
            responseContainer.classList.add('hidden'); // Hide response until dropdown selection

            // Handle the dropdown change event
            document.getElementById('options').addEventListener('change', function() {
                const selectedOptions = Array.from(this.selectedOptions, option => option.value);
                let filteredResponse = {};

                if (selectedOptions.includes('Alphabets')) {
                    filteredResponse.alphabets_array = data.alphabets_array;
                }
                if (selectedOptions.includes('Numbers')) {
                    filteredResponse.numbers_array = data.numbers_array;
                }
                if (selectedOptions.includes('Highest lowercase alphabet')) {
                    filteredResponse.highest_alphabet = data.highest_alphabet;
                }

                // Render the filtered response
                responseOutput.textContent = JSON.stringify(filteredResponse, null, 2);
                responseContainer.classList.remove('hidden');
            });

            errorElement.textContent = '';
        })
        .catch(err => {
            errorElement.textContent = 'Error in API call';
            dropdownContainer.classList.add('hidden');
            responseContainer.classList.add('hidden');
        });
    } catch (err) {
        errorElement.textContent = 'Invalid JSON format';
        dropdownContainer.classList.add('hidden');
        responseContainer.classList.add('hidden');
    }
});
