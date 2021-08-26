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

function stateChange(ev) {
    let req = ev.target;
    if (req.readyState == XMLHttpRequest.DONE) {
        //console.log('Requete finie');
        let content = JSON.parse(req.responseText);
        //console.log(content);

        /*for (let i = 0; i < content.length; i++) {
            let obj = content[i];
            console.log(obj);
        }*/
        let html = '';
        for (let obj of content) { //++ perf!
            //console.log(obj);
            //html += '<option value="' + obj.rate + '">' + obj.name + '</option>';
            html += `<option value="${obj.rate}">${obj.name}</option>`;
        }

        document.getElementById('taux').innerHTML = html;
    }

}

/*function validate(ev) {
    //ev.target = l'élément déclencheur de l'événement
    let domElement = ev.target;
    console.log(ev);
    if (domElement.value == '') {
        //KO
        domElement.classList.add('is-invalid');
        domElement.classList.remove('is-valid');
    } else {
        //OK

        //Que pour les email
        if (domElement.type == 'email') {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(domElement.value)) {
                domElement.classList.add('is-valid');
                domElement.classList.remove('is-invalid');

            } else {
                domElement.classList.add('is-invalid');
                domElement.classList.remove('is-valid');

            }
        }
        else {
            domElement.classList.add('is-valid');
            domElement.classList.remove('is-invalid');

        }
    }
}*/

function testMail(mail) {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(mail);
}

function validate(ev) {
    //ev.target = l'élément déclencheur de l'événement
    let domElement = ev.target;
    let valid = true;

    //tests
    if (domElement.value == '') {
        valid = false;
    } else {
        if (domElement.type == 'email') {
            /*if (testMail(domElement.value) == false) {
                valid = false;
            }*/
            valid = testMail(domElement.value);

            if (domElement.value.includes('yahoo') == true) {
                valid = false;
            }


        }

        if (domElement.type == 'date') {
            //...
        }
    }

    //affichage
    if (valid == true) {
        domElement.classList.add('is-valid');
        domElement.classList.remove('is-invalid');
    } else {
        domElement.classList.add('is-invalid');
        domElement.classList.remove('is-valid');
    }
}


function init(ev) {
    document.getElementById('email').addEventListener('blur', validate);
    document.getElementById('montant').addEventListener('blur', validate);
    document.getElementById('annee').addEventListener('blur', validate);
    document.getElementById('formcalc').addEventListener('submit', submitCalcul);

    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = stateChange;
    httpRequest.open('GET', 'http://localhost:9000/data/rates.json');
    httpRequest.send();

    //console.log("sending");

}

//appel init quand le DOM est chargé complétement
document.addEventListener('DOMContentLoaded', init);



