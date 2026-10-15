function addRow() {
    
    const tbody = document.getElementById('TaulukonRivit');
    
    const buttonRow = document.querySelector('.uusi-rivi');
    
    const newRow = document.createElement('tr');
    
    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
        newRow.appendChild(newCell);
    }
    
    tbody.insertBefore(newRow, buttonRow);
}