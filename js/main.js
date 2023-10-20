

var sitenameinput = document.getElementById ("sitename");
var siteURLinput = document.getElementById ("siteURL");
var allBookmark = [];
if (localStorage.getItem("allBookmark") != null) {
    allBookmark=JSON.parse(localStorage.getItem("allBookmark" ))
    displayAllBookmark();
}

function addBookmark() {

var errmsg = validateForm()
if(errmsg == true){
    var website = {
        sitename: capitalize(sitenameinput.value),
        siteurl: siteURLinput.value
    }
    allBookmark.push(website);
    console.log(allBookmark);
    localStorage.setItem("allBookmark" ,JSON.stringify(allBookmark))
    clearForm();
   displayAllBookmark(); 
}
else{
alert(errmsg)
}
}

function clearForm() {
   sitenameinput.value="" 
   siteURLinput.value=""
}
function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

function displayAllBookmark(){
    var cartona = "";
   for( var i=0 ; i < allBookmark.length ; i++ ){
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${allBookmark[i].sitename} </td>
        <td>
        <a href="https://${allBookmark[i].siteurl}">
          <button class="btn btn-success">
            <i class="fa-solid fa-eye"></i>
            Visit
          </button>
        </a>
        </td>
        <td>
        <button onclick="deleteBookmark(${i})" class="btn btn-delete pe-2" >
        <i class="fa-solid fa-trash-can"></i>
        Delete
        </button>
        </td>
    </tr> `
   }

   document.getElementById('tbody').innerHTML = cartona;
}

function deleteBookmark(idx){
allBookmark.splice( idx , 1);
localStorage.setItem("allBookmark" ,JSON.stringify(allBookmark));
displayAllBookmark();
}

function validateForm(){
  var sitenameRegex=/^[a-z]{3,}$/;
  var siteurlRegex=/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  if(sitenameRegex.test(sitenameinput.value) == false){
    return "Site name must contain at least 3 characters";
  }
  else if(siteurlRegex.test(siteURLinput.value) == false){
    return "Site URL must be a valid one";
  } 
  return true;
}


