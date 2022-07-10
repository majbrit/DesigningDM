const wrapper = document.querySelector(".wrapper");
const range = document.querySelector('input');
content = document.querySelector(".content");
text= document.querySelector(".text");
//const navbar = document.querySelector(".navbar");
selector = wrapper.querySelector(".selector");
//options = wrapper.querySelector(".option");
block=document.querySelector(".block");
var selectText = document.getElementById("selectText");
 options = wrapper.querySelectorAll(".option");
 //option = wrapper.querySelector(".option");
 option = document.querySelector(".option-text");


//Increase and Decrease function
range.addEventListener('input', function(){
   const rangevalue = range.value;
   selector.style.fontSize = rangevalue + "px";
   text.style.fontSize = rangevalue + "px";
   block.style.fontSize = rangevalue + "px";
   //option.style.fontSize = rangevalue + "px";
   
})

// array of languages
//let languages = ["Englisch", "German", "French", "Spanisch", "Italian","Arabic" , "Russian", "Portuguese", "Bengali"];

/*function addLanguage(){
    languages.forEach(language => {
        let li = `<li onclick="updateName(this)">${language}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}
*/
//addLanguage();
options.forEach(option =>{
option.addEventListener("click", () =>{
    let selectedOption = option.querySelector(".option-text").innerText;
    selector.innerText = selectedOption;
    console.log(option)
    wrapper.classList.remove("active");
})
    
})

function updateName(selectedLi){
    wrapper.classList.remove("active");
    selector.firstElementChild.innerText = selectedLi.innerText;
    //selector.innerHTML = selectedLi.innerText;
}
function loadGoogleTranslate(){
    new google.translate.TranslateElement("google_element");
}

selector.addEventListener("click", () => {
    wrapper.classList.toggle("active");
});

