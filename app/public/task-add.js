$(document).ready(function(){
    let form = $('#send_task');
    let select = $('#selectStudent');
    let textInput = $('#textAreaContext');
    let alert = $(".error");
    form.on("submit", async function( event ) {
        event.preventDefault()
        try {
            let title = $('#textTitle').val();
            let id = select.val();
            let text = textInput.val();
            
            await fetch(`http://localhost:8080/api/tasks/add`, {
                method: 'POST',
                body: JSON.stringify({ title: title, id: id, text: text }),
                headers: { 'Content-Type': 'application/json' }
            }).then((data) => {
                return data.json();
            }).then((rep) => {
                location.assign('/professor-panel/tasks');
            })
        } catch(err) {
            console.log("Something wrong!")
        }
    })
})