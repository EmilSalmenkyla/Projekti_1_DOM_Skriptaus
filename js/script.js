// Lisää uusi rivi taulukkoon nappia painamalla
function addRow() {
    const tbody = document.getElementById('TaulukonRivit');
    const buttonRow = document.querySelector('.uusi-rivi');
    const newRow = document.createElement('tr');

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');

        if (i !== 0) {
            newCell.textContent = 'Kirjoita tähän...';
            newCell.classList.add('cell-placeholder');
        }

        newRow.appendChild(newCell);
    }

    tbody.insertBefore(newRow, buttonRow);
}

document.querySelectorAll('#TaulukonRivit tr:not(.uusi-rivi) td').forEach(function(solu) {
    if (solu.cellIndex !== 0 && solu.innerHTML.trim() === '') {
        solu.textContent = 'Kirjoita tähän...';
        solu.classList.add('cell-placeholder');
    }
});

document.getElementById('TaulukonRivit').addEventListener('click', function(event) {
    const td = event.target;

    if (
        td.tagName === 'TD' &&
        td.cellIndex !== 0 &&
        !td.parentElement.classList.contains('uusi-rivi')
    ) {
        if (td.children.length === 0) {
            td.classList.remove('cell-placeholder');

            // Lomake solussa.
            td.innerHTML = `
                <form>
                    <input
                        type="text"
                        placeholder="Kirjoita tähän..."
                        aria-label="Tehtävä"
                    >
                    <button type="submit">Lisää</button>
                    <button type="button" class="peruuta">Peruuta</button>
                    <p class="virheviesti" role="alert"></p>
                </form>
            `;

            const lomake = td.querySelector('form');
            const kentta = lomake.querySelector('input');
            const virheviesti = lomake.querySelector('.virheviesti');

            kentta.focus();

            // Poista tehtävä
            lomake.querySelector('.peruuta').addEventListener('click', function() {
                td.textContent = 'Kirjoita tähän...';
                td.classList.add('cell-placeholder');
            });

            // Tallenna tehtävä
            lomake.addEventListener('submit', function(e) {
                e.preventDefault();

                const teksti = kentta.value.trim();

                if (teksti.length < 3) {
                    virheviesti.textContent = 'Kirjoita vähintään 3 merkkiä.';
                    kentta.classList.add('virhe');
                    kentta.setAttribute('aria-invalid', 'true');
                    kentta.focus();
                    return;
                }

                td.innerHTML = '';
                td.classList.remove('cell-placeholder');

                const tehtavaDiv = document.createElement('div');
                tehtavaDiv.classList.add('tehtava');

                const tekstiSpan = document.createElement('span');
                tekstiSpan.classList.add('tehtava-teksti');
                tekstiSpan.textContent = teksti;

                const napitDiv = document.createElement('div');
                napitDiv.classList.add('tehtava-napit');

                const valmisNappi = document.createElement('button');
                valmisNappi.textContent = '✅';
                valmisNappi.onclick = function(e) {
                    e.stopPropagation();
                    tekstiSpan.classList.toggle('valmis');
                };

                const poistoNappi = document.createElement('button');
                poistoNappi.textContent = '❌';
                poistoNappi.onclick = function(e) {
                    e.stopPropagation();
                    tehtavaDiv.remove();
                    td.textContent = 'Kirjoita tähän...';
                    td.classList.add('cell-placeholder');
                };

                napitDiv.appendChild(valmisNappi);
                napitDiv.appendChild(poistoNappi);
                tehtavaDiv.appendChild(tekstiSpan);
                tehtavaDiv.appendChild(napitDiv);
                td.appendChild(tehtavaDiv);
            });
        }
    }
});
