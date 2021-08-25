function submitCalcul(ev) {
    ev.preventDefault();

    console.log(ev);
    //alert('Calcul');
}



document.getElementById('formcalc').addEventListener('submit', submitCalcul);
