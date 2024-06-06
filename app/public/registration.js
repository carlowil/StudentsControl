$(document).ready(function(){
    const form = document.querySelector('form')
    const username = document.querySelector('#emailInput')
    const password = document.querySelector('#passwordInput')
    const alert = document.querySelector('.error')
    form.addEventListener('submit', async (e) => {
       e.preventDefault()
       try {
         await fetch('/api/auth/register', {
              method: 'POST',
              body: JSON.stringify({ username: username.value, password: password.value}),
              headers: { 'Content-Type': 'application/json' }
         }).then((data) => {
            return data.json()
         }) .then((message) => {
              if(message.status == 400 || message.status == 401){
                alert.style.display = "";
                console.log(message.error);
                return alert.textContent=message.message;
              }
              message.role === "professor" ? location.assign('/professor-panel/tasks') : location.assign('/home')
         })} catch (err) {
            console.log(err.message)
          }
        })
});