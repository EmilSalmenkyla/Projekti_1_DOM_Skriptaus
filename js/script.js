//Lisää uusi rivi taulukkoon nappia painamalla
function addRow() {
    const tbody = document.getElementById('TaulukonRivit');
    const buttonRow = document.querySelector('.uusi-rivi');
    const newRow = document.createElement('tr');
    
    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');
     
        if (i !== 0) {
            newCell.textContent = 'Kirjoita tähän...';
            newCell.style.color = '#999'; 
        }
        newRow.appendChild(newCell);
    }
    
    tbody.insertBefore(newRow, buttonRow);
}


document.querySelectorAll('#TaulukonRivit tr:not(.uusi-rivi) td').forEach(function(solu) {

    if (solu.cellIndex !== 0 && solu.innerHTML.trim() === '') {
        solu.textContent = 'Kirjoita tähän...';
        solu.style.color = '#999'; 
        }
});


document.getElementById('TaulukonRivit').addEventListener('click', function(event) {
    const td = event.target;
    

    if (td.tagName === 'TD' && td.cellIndex !== 0 && !td.classList.contains('uusi-solu')) {
        
       
        if (td.children.length === 0) {
            
            let teksti = prompt("Kirjoita teksti soluun:");
            
            if (teksti !== null && teksti.trim() !== "") {

                td.innerHTML = '';
                td.style.color = 'black';
                
                const tehtavaDiv = document.createElement('div');
                tehtavaDiv.style.display = 'flex';
                tehtavaDiv.style.justifyContent = 'space-between';
                tehtavaDiv.style.alignItems = 'center';
                
                const tekstiSpan = document.createElement('span');
                tekstiSpan.textContent = teksti;
                
                const napitDiv = document.createElement('div');
                
                const valmisNappi = document.createElement('button');
                valmisNappi.textContent = '✅';
                valmisNappi.style.border = 'none';
                valmisNappi.style.background = 'none';
                valmisNappi.style.cursor = 'pointer';
                
                valmisNappi.onclick = function(e) {
                    e.stopPropagation(); 
                    if (tekstiSpan.style.textDecoration === 'line-through') {
                        tekstiSpan.style.textDecoration = 'none';
                        tekstiSpan.style.color = 'black';
                    } else {
                        tekstiSpan.style.textDecoration = 'line-through';
                        tekstiSpan.style.color = '#888';
                    }
                };
                
                const poistoNappi = document.createElement('button');
                poistoNappi.textContent = '❌';
                poistoNappi.style.border = 'none';
                poistoNappi.style.background = 'none';
                poistoNappi.style.cursor = 'pointer';
                
                poistoNappi.onclick = function(e) {
                    e.stopPropagation();
                    tehtavaDiv.remove(); 
                   
                    td.textContent = 'Kirjoita tähän...';
                    td.style.color = '#999';
                };
                
                napitDiv.appendChild(valmisNappi);
                napitDiv.appendChild(poistoNappi);
                
                tehtavaDiv.appendChild(tekstiSpan);
                tehtavaDiv.appendChild(napitDiv);
                
                td.appendChild(tehtavaDiv);
            }
        }
    }
});
