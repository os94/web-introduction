let buttonId = 0;

function clickRegisterButtonEvent() {
   const name = document.querySelector("#name");
   const checkBoxes = document.querySelectorAll(".form-check-input");
   const detail = document.querySelector("#visitor-detail-input");
   let checkedCount = 0;
   checkBoxes.forEach((checkBoxElement) => {
       if(checkBoxElement.checked){
           checkedCount++;
       }
   });
   let checkedCountMessage = checkedCount + "개"
   if (checkedCount === checkBoxes.length) {
       checkedCountMessage = "모두";
   }
   alert(name.value + "님, 저와 영화 취향이 " + checkedCountMessage + " 같으시네요!");

   const registerInfo = {name:name.value, detail:detail.value};
   name.value = "";
   detail.value = "";

   register(registerInfo)
}

function register(registerInfo){
   const visitorCarsTemplate = document.querySelector("#visitor-template").innerText;
   const visitorCard = visitorCarsTemplate.replace("{name}", registerInfo['name'])
       .replace("{detail}", registerInfo['detail'])
       .split("{buttonId}").join(buttonId++);
   document.querySelector("#visitorCards").innerHTML += visitorCard;
}

function modifyCard(buttonId){
   const button = document.querySelector("#" + buttonId);
   if(button.previousElementSibling.readOnly){
       button.previousElementSibling.removeAttribute("readOnly");
       button.innerText = "수정완료";
       return;
   }

   button.innerText = "수정";
   button.previousElementSibling.setAttribute("readOnly", true);
}

function deleteCard(buttonId){
   const button = document.querySelector("#" + buttonId);
   if(confirm("정말 삭제하시겠습니까?")){
       button.parentElement.parentElement.removeChild(button.parentElement);

   }
}

window.addEventListener("load", () => {
   const registerButton = document.querySelector("#register-button");
   registerButton.addEventListener("click", clickRegisterButtonEvent);
})