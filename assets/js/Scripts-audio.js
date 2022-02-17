/* --------------- Script Audio --------------- */

/* ---------- Setup Variabili ---------- */

	/* ----- 0 - Variabili Setup ----- */

	var setup = 0, status = 0;

	/* ----- 1 - Array Frequenze ----- */

	var fxa= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var fya= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var fza= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	/* ----- 2 - Variabili Audio ----- */

	var oscx, oscy, oscz, stereo, reverb;

/* ---------- Start Audio con bottone ---------- */

	document.querySelector('#playaudio').addEventListener('click', async() => {
		if(setup == 0){

			/* ----- Start Audio ----- */
			await Tone.start()

			/* ----- Stereo FX ----- */
			stereo = new Tone.StereoWidener(1).toDestination();

			/* ----- Reverb FX ----- */
			reverb = new Tone.Reverb(1).connect(stereo);

			/* ----- 3 Sine ----- */
			oscx = new Tone.Oscillator().toDestination().connect(reverb);
			oscy = new Tone.Oscillator().toDestination().connect(reverb);
			oscz = new Tone.Oscillator().toDestination().connect(reverb);

			oscx.volume.value= -40;
			oscy.volume.value= -40;
			oscz.volume.value= -40;

			oscx.frequency.value= 0;
			oscy.frequency.value= 0;
			oscz.frequency.value= 0;

			setup = 1;
		}

		if (setup == 1 && status == 1){
			oscx.stop();
			oscy.stop();
			oscz.stop();

			status = 0;

			return
		}

		if (setup == 1 && status == 0){
			await retrivedata()

			oscx.start();
			oscy.start();
			oscz.start();

			status = 1;
		}
	});

	var tempx, tempy, tempz;

	function retrivedata() {
		var dataaduio = new XMLHttpRequest();

		dataaduio.responseType = "json";

		dataaduio.onreadystatechange = function(){
			if (dataaduio.readyState == 4 && dataaduio.status == 200){
				var start = contatore_array;
				var end = contatore_array + 10;
				var index = 0;
				for (var ida = start; ida < end; ida++){
					tempx = dataaduio.response.Macchina1[ida].AcX*1 - 16467;
					fxa[index] = tempx * 56.76;
					tempy = dataaduio.response.Macchina1[ida].AcY*-1 - 95;
					fya[index] = tempy * 56.76;
					tempz = dataaduio.response.Macchina1[ida].AcZ*1 - 1860;
					fza[index] = tempz * 39.02;
					index++;
				}
				if (index == 9){index = 0}
				audio();
			}
		};

		dataaduio.open('GET', 'https://sismi-bucket.s3.eu-south-1.amazonaws.com/database.json');

		dataaduio.send();
	}

	var index_loop = 0;

	function audio(){
		var freqx= fxa[index_loop];
		var freqy= fya[index_loop];
		var freqz= fza[index_loop];

		oscx.frequency.rampTo(freqx, 0.1);
		oscy.frequency.rampTo(freqy, 0.1);
		oscz.frequency.rampTo(freqz, 0.1);

		index_loop++;
		if(index_loop == 10) {index_loop = 0}

		var time = setTimeout(audio, 15);
	}
