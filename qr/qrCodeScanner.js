var qrcode = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");



var farbModus = "rot";
var sprache = "de";
var quelle = "";
var typo = 15;

const bild = document.getElementById("bild");
const ueberschrift = document.getElementById("ueberschrift");
const beschreibung = document.getElementById("beschreibung");
const qricon = document.getElementById("qricon");
const container = document.getElementById("container");
const qrheader = document.getElementById("qrheader");
const abstand = document.getElementById("abstand");


let scanning = false;


//Schriftgröße 
abstand.style.fontSize = typo + "px";

qrcode.callback = res => {
  if (res) {
    outputData.innerText = res;
    console.log(res);
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    //qrResult.hidden = false;
    canvasElement.hidden = true;
    btnScanQR.hidden = false;

    qricon.style.width = "100px";
    container.style.textAlign = "left";
    qrheader.innerHTML = "";

    //Bild einsetzen
    switch (res) {

      case "Virus":
        console.log("Ausstellungsstück: Virus");
        quelle = "../bilder/virus";  
        //Text mit gewählter Sprache
        switch (sprache) {
          case "de":
            console.log("Deutsch");
            ueberschrift.innerHTML = "Virus";
            beschreibung.innerHTML = "Globale Karte, die den Konsens über das Vorhandensein und Fehlen des Dengue-Virus zeigt.";
            break;
          
          case "en":
            ueberschrift.innerHTML = "Virus";
            beschreibung.innerHTML = "Global map showing the evidence consensus on dengue virus presence and absence.";
            break;

          case "es":
            ueberschrift.innerHTML = "Virus";
            beschreibung.innerHTML = "Mapa mundial que muestra el consenso de pruebas sobre la presencia y la ausencia del virus del dengue.";
            break;

          case "fr":
            ueberschrift.innerHTML = "Virus";
            beschreibung.innerHTML = "Carte mondiale montrant le consensus des preuves sur la présence et l'absence du virus de la dengue.";
            break;

          default:
            ueberschrift.innerHTML = "Virus";
            beschreibung.innerHTML = "Global map showing the evidence consensus on dengue virus presence and absence.";
            break;
        }
        break;

      case "Schrift":
        console.log("Ausstellungsstück: Virus");
        quelle = "../bilder/schrift";  
        switch (sprache) {
          case "de":
            console.log("Deutsch");
            ueberschrift.innerHTML = "Schrift";
            beschreibung.innerHTML = "Die Schrift soll für alle farbenfroh wirken, so weit möglich.";
            break;
          
          case "en":
            ueberschrift.innerHTML = "Font";
            beschreibung.innerHTML = "The font should look colorful for everyone, as much as possible.";
            break;

          case "es":
            ueberschrift.innerHTML = "Tipo de Letra";
            beschreibung.innerHTML = "En la medida de lo posible, el tipo de letra debe aparecer en color para todos..";
            break;

          case "fr":
            ueberschrift.innerHTML = "Police de caractères";
            beschreibung.innerHTML = "L'écriture doit paraître colorée pour tous, dans la mesure du possible.";
            break;

          default:
            ueberschrift.innerHTML = "Font";
            beschreibung.innerHTML = "The font should look colorful for everyone, as much as possible.";
            break;
        }
        break;

      default:
        console.log("QR-Code gehört nicht zu einem Ausstellungsstück");
        switch (sprache) {
          case "de":
            console.log("Deutsch");
            ueberschrift.innerHTML = "Fehler";
            beschreibung.innerHTML = "QR-Code gehört nicht zu einem Ausstellungsstück";
            break;
          
          case "en":
            ueberschrift.innerHTML = "Error";
            beschreibung.innerHTML = "QR code does not belong to an exhibit";
            break;

          case "es":
            ueberschrift.innerHTML = "Error";
            beschreibung.innerHTML = "El código QR no pertenece a una exposición";
            break;

          case "fr":
            ueberschrift.innerHTML = "Erreur";
            beschreibung.innerHTML = "Le code QR n'appartient pas à une pièce d'exposition";
            break;

          default:
            ueberschrift.innerHTML = "Error";
            beschreibung.innerHTML = "QR code does not belong to an exhibit";
            break;
        }
        
        break;
    }
    //gewählten Farbemodus einsetzen
    if(farbModus == "normal") {
      quelle = quelle + "/Nvirus.jpg";

    } else if (farbModus == "rot") {
      quelle = quelle + "/rot.png";

    } else if (farbModus == "gruen") {
      quelle = quelle + "/gruen.png";

    } else if (farbModus == "blau") {
      quelle = quelle + "/blau.png";

    } else if (farbModus == "voll") {
      quelle = quelle + "/voll.png";

    }

    bild.src = quelle;


  
  }
};

btnScanQR.onclick = () => {

  console.log("funktioniert");
  qricon.style.width = "";
  container.style.textAlign = "center";
  bild.src = "";
  qrheader.innerHTML = "QR Code Scanner";
  ueberschrift.innerHTML = "";
  beschreibung.innerHTML = "";


  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      //qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    });
};

function tick() {
  canvasElement.height = video.videoHeight;
  canvasElement.width = video.videoWidth;
  canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

  scanning && requestAnimationFrame(tick);
}

function scan() {
  try {
    qrcode.decode();
  } catch (e) {
    setTimeout(scan, 300);
  }
}
