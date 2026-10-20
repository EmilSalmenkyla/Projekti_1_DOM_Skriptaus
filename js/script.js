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
uusiRiviPainike.addEventListener('click', function() {
    addRow();
    tallennaTehtavat(); // Tallennetaan uusi rivi localStorageen
});

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
        valmisNappi.type = 'button';
        valmisNappi.addEventListener('click', function() {
            tekstiSpan.classList.toggle('valmis');
            tallennaTehtavat(); // Tallennetaan valmistumistilan muutos localStorageen
        });

        const poistoNappi = document.createElement('button');
        poistoNappi.textContent = '❌';
        poistoNappi.type = 'button';
        poistoNappi.addEventListener('click', function() {
            naytaTyhjaSolu(td);
            tallennaTehtavat(); // Tallennetaan tehtävän poisto localStorageen
        });

        napitDiv.appendChild(valmisNappi);
        napitDiv.appendChild(poistoNappi);
        tehtavaDiv.appendChild(tekstiSpan);
        tehtavaDiv.appendChild(napitDiv);
        td.appendChild(tehtavaDiv);

        tallennaTehtavat(); // Tallennetaan uusi tehtävä localStorageen
    });
}

// Apufunktio tallennettujen tehtävien näyttämiseen ruudulla
function naytaTehtava(td, teksti, valmis) {
    td.innerHTML = '';

    const tehtavaDiv = document.createElement('div');
    tehtavaDiv.classList.add('tehtava');

    const tekstiSpan = document.createElement('span');
    tekstiSpan.classList.add('tehtava-teksti');
    tekstiSpan.textContent = teksti;

    if (valmis === true) {
        tekstiSpan.classList.add('valmis');
    }

    const napitDiv = document.createElement('div');
    napitDiv.classList.add('tehtava-napit');

    const valmisNappi = document.createElement('button');
    valmisNappi.textContent = '✅';
    valmisNappi.type = 'button';
    valmisNappi.addEventListener('click', function() {
        tekstiSpan.classList.toggle('valmis');
        tallennaTehtavat(); // Tallennetaan valmistumistilan muutos localStorageen
    });

    const poistoNappi = document.createElement('button');
    poistoNappi.textContent = '❌';
    poistoNappi.type = 'button';
    poistoNappi.addEventListener('click', function() {
        naytaTyhjaSolu(td);
        tallennaTehtavat(); // Tallennetaan tehtävän poisto localStorageen
    });

    napitDiv.appendChild(valmisNappi);
    napitDiv.appendChild(poistoNappi);
    tehtavaDiv.appendChild(tekstiSpan);
    tehtavaDiv.appendChild(napitDiv);
    td.appendChild(tehtavaDiv);
}

// Kerätään tehtävät taulukosta ja tallennetaan ne localStorageen
function tallennaTehtavat() {
    const rivit = document.querySelectorAll('#TaulukonRivit tr');
    const tehtavat = [];

    for (let i = 0; i < rivit.length; i++) {
        const solut = rivit[i].querySelectorAll('td');

        for (let j = 1; j < solut.length; j++) {
            const tekstiSpan = solut[j].querySelector('.tehtava-teksti');

            if (tekstiSpan !== null) {
                const valmis = tekstiSpan.classList.contains('valmis');

                tehtavat.push({
                    rivi: i,
                    paiva: j,
                    teksti: tekstiSpan.textContent,
                    valmis: valmis
                });
            }
        }
    }

    const tiedot = {
        rivimaara: rivit.length,
        tehtavat: tehtavat
    };

    // Tallennetaan tiedot JSON-muodossa localStorageen käyttäen setItem-metodia
    localStorage.setItem('projekti1ViikonTodo', JSON.stringify(tiedot));
}

// Ladataan tallennetut tiedot localStoragesta sivun avautuessa
function lataaTehtavat() {
    // Haetaan tallennettu data localStoragesta käyttäen getItem-metodia
    const data = localStorage.getItem('projekti1ViikonTodo');

    if (data === null) {
        addRow();
        return;
    }

    // Muutetaan JSON-teksti takaisin olioksi JSON.parse-metodilla
    const tiedot = JSON.parse(data);

    for (let i = 0; i < tiedot.rivimaara; i++) {
        addRow();
    }

    const rivit = document.querySelectorAll('#TaulukonRivit tr');

    for (let i = 0; i < tiedot.tehtavat.length; i++) {
        const tehtava = tiedot.tehtavat[i];
        if (rivit[tehtava.rivi]) {
            const solut = rivit[tehtava.rivi].querySelectorAll('td');
            if (solut[tehtava.paiva]) {
                naytaTehtava(solut[tehtava.paiva], tehtava.teksti, tehtava.valmis);
            }
        }
    }
}

// Palautetaan tallennetut tiedot tai luodaan ensimmäinen rivi sivun avautuessa
lataaTehtavat();