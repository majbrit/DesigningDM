var farbModus = "normal";
var sprache = "en";
var quelle = "";
var typo = 15;
var buttons = document.querySelectorAll("button");
var spans = document.querySelectorAll("span");
var setting = false;

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

class Firststage extends Stage {
    constructor() {
        super()
    }
    getContent() {
        var stage1 = document.createElement('div');
        var sprachauswahl = document.querySelector(".sprachauswahl");
        sprachauswahl.hidden = false;

        var wrapper = document.querySelector(".wrapper");
        var range = document.querySelector('input');
        var text= document.querySelector(".text");
        var selector = wrapper.querySelector(".selector");
        var block=document.querySelector(".block");

        var options = wrapper.querySelectorAll(".option");
        
        

        range.addEventListener('input', function(){
            typo = range.value;
            selector.style.fontSize = typo + "px";
            document.body.style.fontSize = typo+"px";
            buttons.forEach(el => el.style.fontSize = typo+"px");
            spans.forEach(el => el.style.fontSize = typo+"px");
         });

        options.forEach(option =>{
            option.addEventListener("click", () =>{
                let selectedOption = option.querySelector(".option-text").innerText;
                selector.innerText = selectedOption;
                console.log(selectedOption);
                console.log(option)
                switch (selectedOption) {
                    case "German":
                        sprache = "de";
                        break;

                    case "Spranish":
                        sprache = "es";
                        break;
        
                    case "French":
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
            wrapper.classList.toggle("active");
        });
        function updateName(selectedLi){
            wrapper.classList.remove("active");
            selector.firstElementChild.innerText = selectedLi.innerText;

        }                

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

class Secondstage extends Stage {
    constructor() {
        super()
    }
    getContent() {
        var stage2 = document.createElement('div');
        var modiauswahl = document.querySelector(".modiauswahl");
        modiauswahl.hidden = false;
        var buttonzuqr = document.getElementById("zuqr");
        var zurueckbutton = document.getElementById("zurueck");

        var text = document.createElement('div');
        text.innerHTML ="Test";
        stage2.appendChild(text);
        text.id = "text";

        var voll = document.getElementById("voll");
        var rot = document.getElementById("rot");
        var gruen = document.getElementById("gruen");
        var blau = document.getElementById("blau");
        var normal = document.getElementById("normal");

        switch (sprache) {
            case "de":
                rot.innerHTML = "Rotblind";
                gruen.innerHTML = "Grünblind";
                blau.innerHTML = "Blaublind";
                normal.innerHTML = "Originalbild";
                voll.innerHTML = "Völlige Farbenblindheit";
                break;

            case "es":
                rot.innerHTML = "Ceguera roja";
                gruen.innerHTML = "Ceguera verde";
                blau.innerHTML = "Ceguera azul";
                normal.innerHTML = "Imagen original";
                voll.innerHTML = "Daltonismo total";
                break;

            case "fr":
                rot.innerHTML = "Aveugle rouge";
                gruen.innerHTML = "Cécité verte";
                blau.innerHTML = "Aveugle bleu";
                normal.innerHTML = "Image originale";
                voll.innerHTML = "Daltonisme total";
                break;

            default:
                rot.innerHTML = "Red blind";
                gruen.innerHTML = "Green blind";
                blau.innerHTML = "Blue blind";
                normal.innerHTML = "Original image";
                voll.innerHTML = "Total color blindness";
                break;
        }


        zuqr.onclick = function() {
            modiauswahl.hidden = true;
            stage3.drawStage()
        }
        zurueck.onclick = function() {
            modiauswahl.hidden = true;
            stage1
            .drawStage()
        }

        return stage2;
    }
}
class Thirdstage extends Stage {
    constructor() {
        super()
    }
    getContent() {
        var stage3 = document.createElement('div');
        setting = true;
        var scanner = document.querySelector(".scanner");
        scanner.hidden = false;

        //Schriftgröße
        abstand.style.fontSize = typo + "px";

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


        return stage3;
    }
}

function colormode(mode) {
    farbModus = mode;
}
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
            quelle = "./bilder/virus";
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
            quelle = "./bilder/schrift";
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
        quelle = quelle + "/Nvirus.png";

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



var stage1 = new Firststage();
var stage2 = new Secondstage();
var stage3 = new Thirdstage();

stage1.drawStage();