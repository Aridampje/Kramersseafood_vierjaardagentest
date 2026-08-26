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
    let volgend_maand_titel = document.getElementById("volgend_maand_titel");
    let volgend_maand_lijst = document.getElementById("volgend_maand_lijst");

    data.werknemers.sort((a,b) => {
        return new Date(a.birthDate).getDate() - new Date(b.birthDate).getDate();
    });

    data.werknemers.forEach(persoon => {
        let geboortemaand = new Date(persoon.birthDate).getMonth();
        let geboortedag = new Date(persoon.birthDate).getDate();
        let geboortejaar = new Date (persoon.birthDate).getFullYear();
        let hoe_oud_geworden = huidige_jaar - geboortejaar;

        volgend_maand_titel.textContent =      //VOLGENDE MAAND
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