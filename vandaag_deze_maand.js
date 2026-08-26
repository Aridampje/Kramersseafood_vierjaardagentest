let huidige_tijd = new Date();
let huidige_maand = new Date().getMonth();
let volgend_maand = new Date(huidige_tijd.getFullYear(), huidige_tijd.getMonth() + 1);
let huidige_jaar = new Date().getFullYear();
let deze_maand_in_tekst = huidige_tijd.toLocaleString('nl-NL', { month: 'long' });
let volgend_maand_in_tekst = volgend_maand.toLocaleString('nl-NL', { month: 'long' });

fetch('./mockup_api/nepapi_werknemers.json')
.then(response => response.json())
.then(data => {
    let vandaag_jarig_titel = document.getElementById("vandaag_jarig_titel");
    let vandaag_jarig_lijst = document.getElementById("vandaag_jarig_lijst");
    let deze_maand_titel = document.getElementById("deze_maand_titel");
    let deze_maand_geboortedag = document.getElementById("deze_maand_geboortedag");
    let deze_maand_naam = document.getElementById("deze_maand_naam")
    let deze_maand_leeftijd = document.getElementById("deze_maand_leeftijd")

    data.werknemers.sort((a,b) => {
        return new Date(a.birthDate).getDate() - new Date(b.birthDate).getDate();
    });

    data.werknemers.forEach(persoon => {
        let geboortemaand = new Date(persoon.birthDate).getMonth();
        let geboortedag = new Date(persoon.birthDate).getDate();
        let geboortejaar = new Date (persoon.birthDate).getFullYear();
        let hoe_oud_geworden = huidige_jaar - geboortejaar;

        vandaag_jarig_titel.textContent =     //VANDAAG
        `Vandaag jarig ( ${huidige_tijd.getDate()} ${deze_maand_in_tekst})`;
        if(geboortemaand == huidige_maand && geboortedag == huidige_tijd.getDate()){
            let vandaag_jarig = document.createElement("h2");
            vandaag_jarig.textContent = `${persoon.firstName} ${persoon.lastName}
            is vandaag jarig!! Hij is nu ${hoe_oud_geworden}`;
            vandaag_jarig_lijst.appendChild(vandaag_jarig);
        };
        
        deze_maand_titel.textContent =        //DEZE MAAND
        `Deze maand jarig (${deze_maand_in_tekst})`;
        if(geboortemaand == huidige_maand){
            deze_maand_geboortedag.innerHTML += `<h3>${geboortedag}</h3>`;
            deze_maand_naam.innerHTML += `<h3>${persoon.firstName} ${persoon.lastName}</h3>`;
            deze_maand_leeftijd.innerHTML += `<h3> ${hoe_oud_geworden}</h3>`;
        }
    });
})
.catch(error => console.error(error));

// De datums van iedereen wanneer ze jarig zijn moet je zien zijn overal.
//github pages om mijn pagina neer te zetten en dan via url op loopsign zetten.
//loopsign

//volgend maand jarig apart pagina
//versier het zoals het al is
//nep key van afas gebruiken, nep key