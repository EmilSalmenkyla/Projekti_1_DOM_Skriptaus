//Tunniste tekstikentille 
let lomakeNumero = 0;

//Solut viikonpäiville + reuna sarake .
function addRow() {
    const tbody = document.getElementById('TaulukonRivit');
    const newRow = document.createElement('tr');

    for (let i = 0; i < 8; i++) {
        const newCell = document.createElement('td');

        //Tyhjä ensimmäinen sarake
        if (i !== 0) {
            naytaTyhjaSolu(newCell);
        }

        newRow.appendChild(newCell);
    }

    tbody.appendChild(newRow);
}

//Kirjoituspainike tyhjässä solussa
function naytaTyhjaSolu(td) {
    td.innerHTML = '';

    const kirjoitaNappi = document.createElement('button');
    kirjoitaNappi.type = 'button';
    kirjoitaNappi.textContent = 'Kirjoita tähän...';
    kirjoitaNappi.classList.add('kirjoita-nappi');

    kirjoitaNappi.addEventListener('click', function() {
        avaaLomake(td);
    });

    td.appendChild(kirjoitaNappi);
}

const uusiRiviPainike = document.querySelector('#uusi-rivi-painike');
uusiRiviPainike.addEventListener('click', addRow);


//Rivi sivun avautuessa
addRow();

//Lomakkeen avaus soluun, jonka painiketta klikattiin.
function avaaLomake(td) {
    lomakeNumero = lomakeNumero + 1;

            //Lomake solussa
            td.innerHTML = `
                <form>
                    <label for="tehtava-${lomakeNumero}">Tehtävä:</label>

                    <input
                        id="tehtava-${lomakeNumero}"
                        type="text"
                        placeholder="Kirjoita tähän..."
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

            //Peruuta tehtävän lisäys
            lomake.querySelector('.peruuta').addEventListener('click', function() {
                naytaTyhjaSolu(td);
            });

            //Tallenna tehtävä
            lomake.addEventListener('submit', function(e) {
                e.preventDefault();

                kentta.classList.remove('virhe');
                virheviesti.textContent = '';

                const teksti = kentta.value.trim();

                if (teksti.length < 3) {
                    virheviesti.textContent = 'Kirjoita vähintään 3 merkkiä.';
                    kentta.classList.add('virhe');
                    kentta.focus();
                    return;
                }

                td.innerHTML = '';

                const tehtavaDiv = document.createElement('div');
                tehtavaDiv.classList.add('tehtava');

                const tekstiSpan = document.createElement('span');
                tekstiSpan.classList.add('tehtava-teksti');
                tekstiSpan.textContent = teksti;

                const napitDiv = document.createElement('div');
                napitDiv.classList.add('tehtava-napit');

                const valmisNappi = document.createElement('button');
                valmisNappi.textContent = '✅';
                valmisNappi.addEventListener('click', function() {
                    tekstiSpan.classList.toggle('valmis');
                });

                const poistoNappi = document.createElement('button');
                poistoNappi.textContent = '❌';
                poistoNappi.addEventListener('click', function() {
                    naytaTyhjaSolu(td);
                });

                napitDiv.appendChild(valmisNappi);
                napitDiv.appendChild(poistoNappi);
                tehtavaDiv.appendChild(tekstiSpan);
                tehtavaDiv.appendChild(napitDiv);
                td.appendChild(tehtavaDiv);
    });
}

