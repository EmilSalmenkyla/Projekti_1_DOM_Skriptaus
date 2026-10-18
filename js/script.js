
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

document.getElementById('TaulukonRivit').addEventListener('click', function(event) {
    // Varmistetaan, että klikattiin taulukon solua (td), eikä esim. "Lisää rivi" -painikkeen solua
    if (event.target.tagName === 'TD' && !event.target.classList.contains('uusi-solu') && !event.target.closest('#uusi-rivi-painike')) {
        
        let teksti = prompt("Kirjoita teksti soluun:");
        
       
        if (teksti !== null && teksti.trim() !== "") {
            event.target.textContent = teksti;
        }
    }
});

