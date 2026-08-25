let huidige_tijd = new Date();
let huidige_dag = new Date().getDay();
let huidige_maand = new Date().getMonth();
let volgend_maand = new Date(huidige_tijd.getFullYear(), huidige_tijd.getMonth() + 1);
let huidige_jaar = new Date().getFullYear();
let deze_maand_in_tekst = huidige_tijd.toLocaleString('nl-NL', { month: 'long' });
let volgend_maand_in_tekst = volgend_maand.toLocaleString('nl-NL', { month: 'long' })


fetch('./mockup_api/nepapi_werknemers.json')
.then(response => response.json())
.then(data => {
    let vandaag_jarig_titel = document.getElementById("vandaag_jarig_titel");
    let vandaag_jarig_lijst = document.getElementById("vandaag_jarig_lijst");
    let deze_maand_titel = document.getElementById("deze_maand_titel");
    let volgend_maand_titel = document.getElementById("volgend_maand_titel");
    let deze_maand_lijst = document.getElementById("deze_maand_lijst");
    let volgend_maand_lijst = document.getElementById("volgend_maand_lijst");

    data.werknemers.forEach(persoon => {
        let geboortemaand = new Date(persoon.birthDate).getMonth();
        let geboortedag = new Date(persoon.birthDate).getDate();
        let geboortejaar = new Date (persoon.birthDate).getFullYear();
        let hoe_oud_geworden = huidige_jaar - geboortejaar;

        vandaag_jarig_titel.textContent = 
        `Vandaag jarig ( ${geboortedag} ${deze_maand_in_tekst})`
        if(geboortemaand == huidige_maand && geboortedag == huidige_tijd.getDate()){
            let vandaag_jarig = document.createElement("h3");
            vandaag_jarig.textContent = `${persoon.firstName} ${persoon.lastName}
            is vandaag jarig!! Hij is nu ${hoe_oud_geworden}`;
            vandaag_jarig_lijst.appendChild(vandaag_jarig);
        };
        
        deze_maand_titel.textContent = 
        `Deze maand jarig 
        (${deze_maand_in_tekst})`; 
        if(geboortemaand == huidige_maand){
            let birthdaylijst = document.createElement("h3");
            birthdaylijst.textContent = `${persoon.firstName} ${persoon.lastName}
            is om ${geboortedag} ${deze_maand_in_tekst} jarig hij word ${hoe_oud_geworden}`;
            deze_maand_lijst.appendChild(birthdaylijst);
        }

        volgend_maand_titel.textContent = 
        `Volgend maand jarig (${volgend_maand_in_tekst})`;
        if(geboortemaand == huidige_maand + 1){
            let birthdaylijst = document.createElement("h3");
            birthdaylijst.textContent = `${persoon.firstName} ${persoon.lastName}
            is om ${geboortedag} ${volgend_maand_in_tekst} jarig hij word ${hoe_oud_geworden}`;
            volgend_maand_lijst.appendChild(birthdaylijst)
        }
    });
})
.catch(error => console.error(error));

// De datums van iedereen wanneer ze jarig zijn moet je zien zijn overal.