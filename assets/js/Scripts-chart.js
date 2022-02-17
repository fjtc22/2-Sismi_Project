/* --------------- Script Grafico --------------- */

/* ---------- Setup Variabili ---------- */

	/* ----- 0 - Colore Bolle ----- */

	var colore = 'rgb(0, 0, 0, 0.14)';

	/* ----- 1 - Bolle Necessarie da stampare ----- */

	var p0 =  [0, 0, 0], p1 =  [0, 0, 0], p2 =  [0, 0, 0], p3 =  [0, 0, 0], p4 =  [0, 0, 0];
	var p5 =  [0, 0, 0], p6 =  [0, 0, 0], p7 =  [0, 0, 0], p8 =  [0, 0, 0], p9 =  [0, 0, 0];
	var p10 = [0, 0, 0], p11 = [0, 0, 0], p12 = [0, 0, 0], p13 = [0, 0, 0], p14 = [0, 0, 0];
	var p15 = [0, 0, 0], p16 = [0, 0, 0], p17 = [0, 0, 0], p18 = [0, 0, 0], p19 = [0, 0, 0],
		p20 = [0, 0, 0];


/* ---------- Setup Grafico ---------- */

	var grafico = document.getElementById('grafico').getContext('2d');

	var graficobubble = new Chart(grafico, {
		type:'bubble',

		data: {datasets: [
				{
					label: ['Punto 1'],
					data: [{x: p0[0], y: p0[1], r: p0[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 2'],
					data: [{x: p1[0], y: p1[1], r: p1[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 3'],
					data: [{x: p2[0], y: p2[1], r: p2[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 4'],
					data: [{x: p3[0], y: p3[1], r: p3[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 5'],
					data: [{x: p4[0], y: p4[1], r: p4[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 6'],
					data: [{x: p5[0], y: p5[1], r: p5[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 7'],
					data: [{x: p6[0], y: p6[1], r: p6[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 8'],
					data: [{x: p7[0], y: p7[1], r: p7[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 9'],
					data: [{x: p8[0], y: p8[1], r: p8[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 10'],
					data: [{x: p9[0], y: p9[1], r: p9[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 11'],
					data: [{x: p10[0], y: p10[1], r: p10[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 12'],
					data: [{x: p11[0], y: p11[1], r: p11[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 13'],
					data: [{x: p12[0], y: p12[1], r: p12[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 14'],
					data: [{x: p13[0], y: p13[1], r: p13[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 15'],
					data: [{x: p14[0], y: p14[1], r: p14[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 16'],
					data: [{x: p15[0], y: p15[1], r: p15[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 17'],
					data: [{x: p16[0], y: p16[1], r: p16[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 18'],
					data: [{x: p17[0], y: p17[1], r: p17[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 19'],
					data: [{x: p18[0], y: p18[1], r: p18[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 20'],
					data: [{x: p19[0], y: p19[1], r: p19[2]}],
					backgroundColor: colore},
				{
					label: ['Punto 21'],
					data: [{x: p20[0], y: p20[1], r: p20[2]}],
					backgroundColor: colore}
			]},

		options:{
			scales: {
				xAxes: [{
					gridLines: {
						display:false
					},
					ticks: {
						display:false,
						min: 16000,
						max: 17250,
						stepSize: 50
					}
				}],
				yAxes: [{
					gridLines: {
						display:false
					},
					ticks: {
						display:false,
						min: -6000,
						max: 0,
						stepSize: 500
					}
				}]
			},
			legend:{
				display: false
			},
			animation: {
				duration: 0
			},
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
				enabled: false
			}
		}
	});

	Temporeale();


/* ---------- Richieste HTML ---------- */

	var array_database;

	/* ----- 0 - Chiamata HTTPS on Load ----- */

	function Temporeale(){
		var request = new XMLHttpRequest();

		request.responseType = "json"; // File in arrivo in formato JSON

		request.onreadystatechange = function(){
			if (request.readyState == 4 && request.status == 200){
				array_database = request.response;
				read_database();
			}
		};

		/* Definisco dove prendere il File Statico */
		request.open('GET', 'https://sismi-bucket.s3.eu-south-1.amazonaws.com/database.json');

		request.send();
	}

	/* ----- 0.5 - Swap tra Grafico Storico e Live ----- */

	function storico(){
		clear_grafico();
		richiesta_storico();
	}

	function live(){
		clear_grafico();
		Temporeale();
	}


/* ---------- Funzioni di Update Grafico ---------- */

	/* ----- 1 - Lettura database ----- */

	contatore_array = getRandomIntInclusive(0,1195);

	function read_database() {
		if (contatore_array > 1198){contatore_array = 0;}
		contatore_array++;
		stampagps();
		setup_dati();
	}

	/* ----- 2 - Ricavo 3 valori e inizio il ciclo ----- */

	var upx = 0, upy = 0, upr = 0, k = 0, time_macchina = 0, buffer_macchina = 0;

	function setup_dati() {

		/* Porto i dati dal database a 3 variabili e li rendo numeri */
		upx = array_database.Macchina1[contatore_array].AcX*1;
		upy = array_database.Macchina1[contatore_array].AcZ*1;
		upr = array_database.Macchina1[contatore_array].AcY*1;

		/* Li rendo tutti positivi */
		numeri_positivi();

		/* Controllo gli errori, se presenti faccio una nuova chiamata HTTP dopo 5 sec*/
		var e = check_valori();
		if (e == 1 || e == 2){ setTimeout(Temporeale, 5000)}

		/* Ricavo la differenza di Timecode */
		time_macchina = array_database.Macchina1[contatore_array].time;
		k = time_macchina - buffer_macchina;
		buffer_macchina = time_macchina;

		setup_grafico();
	}

	/* ----- 3 - Definisco i valori del grafico ----- */

	var vbolla = 0, nbolla = -1;
	var step_incrementale, step_decrementale, vecchio_raggio, raggio = 0;
	var max_animazione = 0, numero_animazioni = 0, tempo_animazioni = 0;

	function setup_grafico(){

		/* Incremento l'indice del contattore */
		vbolla++;
		nbolla++;

		/* Limito le bolle a 20 presenti */
		if (vbolla == 21) { vbolla = 0}
		if (nbolla == 21) { nbolla = 0}

		/* Definisco le costanti di animazione */
		if (k == 3){numero_animazioni = 120, tempo_animazioni = 25}
		if (k == 6){numero_animazioni = 240, tempo_animazioni = 25}
		if (k == 9){numero_animazioni = 360, tempo_animazioni = 25}

		/* Definisco gli Step di animazione */
		step_incrementale = upr * 0.5;   //Variabile per modificare il raporto Dati/Pixel
		step_incrementale = step_incrementale / numero_animazioni;

		vecchio_raggio = graficobubble.data.datasets[vbolla].data[0].r;
		step_decrementale = vecchio_raggio / numero_animazioni;

		/* Resetto il contatore e faccio partire l'animazione */
		max_animazione = 0;
		raggio = 0;
		var microstep = setTimeout(animazione, tempo_animazioni);
	}

	/* ----- 4 - Animazioni Bolle ----- */

	function animazione(){

		/* Riduco il Vecchio raggio di uno step e colmo errori di calcolo */
		vecchio_raggio = vecchio_raggio - step_decrementale;
		if(vecchio_raggio < 0){vecchio_raggio = 0}

		/* Render grafico del nuovo step */
		graficobubble.data.datasets[nbolla].data[0].x = upx;
		graficobubble.data.datasets[nbolla].data[0].y = upy * -1;
		graficobubble.data.datasets[nbolla].data[0].r = raggio;
		graficobubble.data.datasets[vbolla].data[0].r = vecchio_raggio;
		graficobubble.update();

		/* Incremento lo step della nuova bolla */
		raggio = raggio + step_incrementale;

		/* Ripeto l'animazione finche non arrivo a 60 step */
		if (max_animazione == numero_animazioni){max_animazione=0; read_database()}
		else {max_animazione++; microstep=setTimeout(animazione, tempo_animazioni)}
	}


/* ---------- Funzioni di Grafico Storico ---------- */ /*!!! Da Attivare !!!*/

	/* ----- 1 - Mando il tempo da cui partire ----- */

	function SendTempo(){
		var input_data = document.getElementById("ricercadata").value;
		var send_data = new Date(input_data).getTime() / 1000;
		var query = 'SELECT * from Data WHERE time > ' + send_data + ' limit 10';

		var richiesta_temporale = new XMLHttpRequest();

		richiesta_temporale.onreadystatechange = function(){
			if (richiesta_temporale.readyState == 4 && richiesta_temporale.status == 200){
				return
			}
		};

		richiesta_temporale.open('POST', 'http://raspi-hyperink:1880/query');

		richiesta_temporale.setRequestHeader("header", "application/json");

		richiesta_temporale.send(query);
	}

	/* ----- 2 - Faccio la nuova richiesta al Database e stampo ----- */

	function richiesta_storico(){
		var request_storico = new XMLHttpRequest();

		request_storico.responseType = "json";

		request_storico.onreadystatechange = function(){
			if (request_storico.readyState == 4 && request_storico.status == 200){
				array_database = request_storico.response;
				read_database()
			}
		};

		request_storico.open('GET', 'https://sismi-bucket.s3.eu-south-1.amazonaws.com/database.json');

		request_storico.send();
	}


/* ---------- Funzioni di Utility ---------- */

	/* ----- Prendi un numero casuale da un range di valori ----- */

	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	/* ----- Rendi tutti i tre valori positivi ----- */

	function numeri_positivi(){
		if(upx < 0){upx = upx*-1}
		if(upy < 0){upy = upy*-1}
		if(upr < 0){upr = upr*-1}
	}

	/* ----- Controlla se sono presenti degli errori  ----- */

	var check_timecode = 9999999999;

	function check_valori(){
		var t = array_database.Macchina1[contatore_array].time;
		if (t == check_timecode){alert("Macchina Spenta"); return 1}
		else {check_timecode = t;}
		if (upx == 1 || upy == 1 || upr == 1){alert("Problemi con la Macchina"); return 2}
	}

	/* ----- Stampo i valori GPS nel Picker  ----- */

	function stampagps(){
		var nlo, nla;
		var latitudine=array_database.Macchina1[0].Latitudine;
		var longitudine=array_database.Macchina1[0].Longitudine;

		if (longitudine < 10){nlo = 1;} else {nlo = 2;}
		if (latitudine < 10){nla = 1;} else {nla = 2;}

		latitudine = latitudine * 100;
		longitudine = longitudine * 100;
		var lat = String(latitudine);
		var lon = String(longitudine);

		document.getElementById("gps_macchina").innerHTML = lat.slice(0, nla) + ' ' + lat.slice(nla, nla+2) + ' ' + lon.slice(0, nlo) + ' ' + lon.slice(nlo, nlo+2);
	}

	/* ----- Pulizia di tutto il grafico  ----- */

	function clear_grafico (){
		clearTimeout(microstep);
		for (var i = 0; i < 21; i++){
			graficobubble.data.datasets[i].data[0].x = 0;
			graficobubble.data.datasets[i].data[0].y = 0;
			graficobubble.data.datasets[i].data[0].r = 0;
			graficobubble.update;
		}
		graficobubble.clear();
		vbolla = 0;
		nbolla = -1;
	}
