function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('text').value;

    console.log('::: Form Submitted :::');
    fetch('/apiCall', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({formText}),
    })
        .then((response) => response.json())
        .then((data) => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = JSON.stringify(data);
        })
        .catch((error) => console.error(error));
}

export {handleSubmit};
