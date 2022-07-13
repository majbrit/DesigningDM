var farbModus = "normal";
var sprache = "en";
var typo = 15;
//Link zum Bild im richtigen Farbmodus und richtigem Ausstellungsstück wird hier gespeichert
var quelle = "";

var buttons = document.querySelectorAll("button");
var spans = document.querySelectorAll("span");

//Variable speichert, ob zu Sprachauswahl über Einstellung oder Zurück gelangt 
var setting = false;

//Variablen für QR-Code-Scanner-Seite
var qrcode = window.qrcode;
const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");
const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");
const bild = document.getElementById("bild");
const ueberschrift = document.getElementById("ueberschrift");
const beschreibung = document.getElementById("beschreibung");
const qricon = document.getElementById("qricon");
const container = document.getElementById("container");
const qrheader = document.getElementById("qrheader");
const abstand = document.getElementById("abstand");
let scanning = false;

//Variablen für Sprachauswahl-Seite
var wrapper = document.querySelector(".wrapper");
var range = document.querySelector('input');
var text= document.querySelector(".text");
var selector = wrapper.querySelector(".selector");
var block=document.querySelector(".block");
var options = wrapper.querySelectorAll(".option");

//Variblen, um die drei verschiedenen Seiten sichtbar und unsichtbar zu machen
var scanner = document.querySelector(".scanner");
var sprachauswahl = document.querySelector(".sprachauswahl");
var modiauswahl = document.querySelector(".modiauswahl");


//* Funktionen, Listener, ... für Sprachauswahl-Seite
//Slider
range.addEventListener('input', function(){
    console.log("range");
    typo = range.value;
    selector.style.fontSize = typo + "px";
    document.body.style.fontSize = typo+"px";
    buttons.forEach(el => el.style.fontSize = typo+"px");
    spans.forEach(el => el.style.fontSize = typo+"px");
 });
//Sprachauswahl
options.forEach(option =>{
    console.log("option");
    option.addEventListener("click", () =>{
        console.log("Event Listener");
        let selectedOption = option.querySelector(".option-text").innerText;
        selector.innerText = selectedOption;
        console.log(selectedOption);
        console.log(option)
        switch (selectedOption) {
            case "Deutsch":
                sprache = "de";
                break;
            case "Español":
                sprache = "es";
                break;
            case "Français":
                sprache = "fr";
                break;
            default:
                sprache = "en";
                break;
        }
        wrapper.classList.remove("active");
        switch (sprache) {
            case "de":
                console.log("Deutsch");
                text.innerHTML = "Schriftgröße einstellen";
                break;
            case "es":
                text.innerHTML = "Establecer el tamaño de la fuente";
                break;
            case "fr":
                text.innerHTML = "Régler la taille de la police";
                break;
            default:
                text.innerHTML = "Adjust font size";
                break;
        }
    })       
})
selector.addEventListener("click", () => {
    console.log("set active")
    wrapper.classList.toggle("active");
});
function updateName(selectedLi){
    console.log("update name");
    wrapper.classList.remove("active");
    selector.firstElementChild.innerText = selectedLi.innerText;
}      


//* Funktionen, Listener, ... für Modusauswahl-Seite
//Ausgewählten Farbmodus speichern
function colormode(mode) {
    console.log("color mode");
    farbModus = mode;
}


//* Funktionen, Listener, ... für QR-Code-Scanner-Seite
//Schalten zwischen zeigen und Verstecken beim Einstellungs-Dropdownmenü
function chooseSetting() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
// Einstellungs-Dropdownmenü schließen, wenn neben Menü geklickt wird
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}
//wenn ein Menüpunkt des Einstellungs-Dropdownmenü geklickt, zur entsprechenden Seite
function setPage(p) {
    console.log("funktioniert");
        qricon.style.width = "";
        container.style.textAlign = "center";
        bild.src = "";
        qrheader.innerHTML = "QR Code Scanner";
        ueberschrift.innerHTML = "";
        beschreibung.innerHTML = "";
    console.log("setPage");
    scanner.hidden = true;
    if (p=="language") {
        stage1.drawStage();
    } else {
        stage2.drawStage();
    }   
}
//Video zeigen
function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    scanning && requestAnimationFrame(tick);
}
//QR-Code scannen
function scan() {
try {
    qrcode.decode();
} catch (e) {
    setTimeout(scan, 300);
}
}
//Antwort des Scans auswerten
qrcode.callback = res => {
    if (res) {
        outputData.innerText = res;
        console.log(res);
        scanning = false;

        video.srcObject.getTracks().forEach(track => {
        track.stop();
        });

        canvasElement.hidden = true;
        btnScanQR.hidden = false;

        qricon.style.width = "100px";
        container.style.textAlign = "left";
        qrheader.innerHTML = "";

        //Aussellungsbild entsprechend dem Farbmodus einsetzen
        switch (res) {
        //Ausstellungsstück: Virus
        case "Virus":
            console.log("Ausstellungsstück: Virus");
            quelle = "./bilder/virus";
            //Text mit gewählter Sprache
            switch (sprache) {
            case "de":
                console.log("Deutsch");
                ueberschrift.innerHTML = "Virus";
                beschreibung.innerHTML = "Globale Karte, die den Konsens über das Vorhandensein und Fehlen des Dengue-Virus zeigt.";
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
        //Ausstellungsstück: Schrift
        case "Schrift":
            console.log("Ausstellungsstück: Virus");
            quelle = "./bilder/schrift";
            switch (sprache) {
            case "de":
                console.log("Deutsch");
                ueberschrift.innerHTML = "Schrift";
                beschreibung.innerHTML = "Die Schrift soll für alle farbenfroh wirken, so weit möglich.";
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
        //Ausstellungsstück: keins erkannt
        default:
            console.log("QR-Code gehört nicht zu einem Ausstellungsstück");
            switch (sprache) {
            case "de":
                console.log("Deutsch");
                ueberschrift.innerHTML = "Fehler";
                beschreibung.innerHTML = "QR-Code gehört nicht zu einem Ausstellungsstück";
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
        quelle = quelle + "/normal.png";
        } else if (farbModus == "rot") {
        quelle = quelle + "/rot.png";
        } else if (farbModus == "gruen") {
        quelle = quelle + "/gruen.png";
        } else if (farbModus == "blau") {
        quelle = quelle + "/blau.png";
        } else if (farbModus == "voll") {
        quelle = quelle + "/voll.png";
        }
        //Ausstellungsbild 
        bild.src = quelle;
    }
};

//Oberklasse für die Stages (verschiedenen Seiten)
class Stage {
    constructor() {
    }
    drawStage() {
        var museum = document.getElementById('museum');       
        var stage1 = this.getContent();
        museum.innerHTML = "";
        museum.appendChild(stage1);

    }
}


//* Klasse für Sprachauswahl-Seite
class Firststage extends Stage {
    constructor() {
        super()
    }
    getContent() {
        var stage1 = document.createElement('div');   
        sprachauswahl.hidden = false;

        //Wenn über Einstellung der QR-Code-Scanner-Seite seite zur Sprachauswahl-Seite gelangt wurde, 
        //führt weiter-Button zur QR-Code-Scanner-Seite
        //ansonsten führt weiter-Button zur Modusauswahl-Seite
        block.onclick = function() {
            sprachauswahl.hidden = true;
            if(setting) {
                stage3.drawStage()
            }
            else{
                stage2.drawStage()
            }     
        }
        return stage1;
    }
}

//* Klasse für Modusauswahl-Seite
class Secondstage extends Stage {
    constructor() {
        super()
    }
    getContent() {
        var stage2 = document.createElement('div');
        
        modiauswahl.hidden = false;

        var buttonzuqr = document.getElementById("zuqr");
        var zurueckbutton = document.getElementById("zurueck");

        var moditext = document.getElementById("moditext");

        var voll = document.getElementById("voll");
        var rot = document.getElementById("rot");
        var gruen = document.getElementById("gruen");
        var blau = document.getElementById("blau");
        var normal = document.getElementById("normal");

        //Sprachen der Texte anpassen
        switch (sprache) {
            case "de":
                moditext.innerHTML = "Wählen Sie einen Farbmodus:";
                rot.innerHTML = "Rotblind";
                gruen.innerHTML = "Grünblind";
                blau.innerHTML = "Blaublind";
                normal.innerHTML = "Originalbild";
                voll.innerHTML = "Völlige Farbenblindheit";
                break;
            case "es":
                moditext.innerHTML = "Selecciona un modo de color:";
                rot.innerHTML = "Ceguera roja";
                gruen.innerHTML = "Ceguera verde";
                blau.innerHTML = "Ceguera azul";
                normal.innerHTML = "Imagen original";
                voll.innerHTML = "Daltonismo total";
                break;
            case "fr":
                moditext.innerHTML = "Choisissez un mode de couleur:";
                rot.innerHTML = "Aveugle rouge";
                gruen.innerHTML = "Cécité verte";
                blau.innerHTML = "Aveugle bleu";
                normal.innerHTML = "Image originale";
                voll.innerHTML = "Daltonisme total";
                break;
            default:
                moditext.innerHTML = "Select a color mode:";
                rot.innerHTML = "Red blind";
                gruen.innerHTML = "Green blind";
                blau.innerHTML = "Blue blind";
                normal.innerHTML = "Original image";
                voll.innerHTML = "Total color blindness";
                break;
        }
        //Weiter-Button führt zur QR-Code-Scanner-Seite
        buttonzuqr.onclick = function() {
            modiauswahl.hidden = true;
            stage3.drawStage()
        }
        //Zurück-Button führt zur Sprachauswahl-Seite
        zurueckbutton.onclick = function() {
            modiauswahl.hidden = true;
            stage1.drawStage()
        }
        return stage2;
    }
}

//* Klasse für Modusauswahl-Seite
class Thirdstage extends Stage {
    constructor() {
        super()
    }
    getContent() {
        var stage3 = document.createElement('div');
        setting = true;
        scanner.hidden = false;

        var lang = document.getElementById("lang");
        var mod = document.getElementById("mod");

        //Sprachen der Texte anpassen
        switch (sprache) {
            case "de":
                lang.innerHTML="Sprach- und Größenauswahl";
                mod.innerHTML="Modusauswahl";
                break;
            case "es":
                lang.innerHTML="Selección de idioma y tamaño";
                mod.innerHTML="Selección de modo";
                break;
            case "fr":
                lang.innerHTML="Choix de la langue et de la taille";
                mod.innerHTML="Sélection du mode";
                break;
            default:
                lang.innerHTML="Language and size selection";
                mod.innerHTML="Mode selection";
                break;
        }

        //Funktion für QR-Button (Aussehen: QR-Code-Icon)
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
                    btnScanQR.hidden = true;
                    canvasElement.hidden = false;
                    video.setAttribute("playsinline", true);
                    video.srcObject = stream;
                    video.play();
                    tick();
                    scan();
                });
        };
        return stage3;
    }
}

var stage1 = new Firststage();
var stage2 = new Secondstage();
var stage3 = new Thirdstage();
//* Start: erste seite wird gezeigt
stage1.drawStage();