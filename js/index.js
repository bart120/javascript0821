function submitCalcul(ev) {
    ev.preventDefault();

    let rate = document.getElementById('taux').value;
    let years = document.getElementById('annee').value;
    let principal = document.getElementById('montant').value;

    //montant par mois
    let monthlyRate = rate / 100 / 12;
    let monthlyPayment = principal * monthlyRate / (1 - (Math.pow(1 / (1 + monthlyRate), years * 12)));

    document.getElementById('montantmois').innerHTML = Math.round(monthlyPayment);

    //amortissement

    let html = '';
    for (let y = 0; y < years; y++) {
        let interestY = 0;
        let principalY = 0;
        for (let m = 0; m < 12; m++) {
            let = interestM = principal * monthlyRate;
            let = principalM = monthlyPayment - interestM;
            interestY += interestM;
            principalY += principalM;
            principal -= principalM;
            //console.log(principal);
            html += '<tr><td>' + Math.round(principalM) + '</td><td>' + Math.round(interestM) + '</td></tr>';
        }
    }
    document.getElementById('tablemonth').innerHTML = html;

    /*let table = document.getElementById('tablemonth');
    for (let y = 0; y < years; y++) {
        let interestY = 0;
        let principalY = 0;
        for (let m = 0; m < 12; m++) {
            let = interestM = principal * monthlyRate;
            let = principalM = monthlyPayment - interestM;
            interestY += interestM;
            principalY += principalM;
            principal -= principalM;
            let ligne = document.createElement('tr');
            let col = document.createElement('td');
            col.innerHTML = Math.round(principalM);
            ligne.appendChild(col);
            let col2 = document.createElement('td');
            col2.innerHTML = Math.round(interestM);
            ligne.appendChild(col2);
            table.appendChild(ligne);

        }
    }*/

}

function init() {
    document.getElementById('formcalc').addEventListener('submit', submitCalcul);
}

document.addEventListener('DOMContentLoaded', init);



