$(document).ready( async function(){
    let sendButton = $('.check-button');
    let modal = $('#markModal');
    let modal_title = $('#markModalLabel');
    let dialogSendButton = $('#dialogSendButton');
    let dialogSelect = $('#dialogSelect');
    let taskId = "";
    await fetch(`http://localhost:8080/api/marks`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((data) => {
        return data.json();
    }).then((rep) => {
        let realMarks = rep.marks;
        realMarks.forEach((mark) => {
            dialogSelect.append($('<option>', {
                value: mark.id,
                text: `${mark.mark} - ${mark.comment}`
            }));
        });
    })
    sendButton.on('click', async function() {
        let title = $(this).closest('.card').data('title');
        taskId = $(this).closest('.card').data('id');
        modal_title.text(title);
        modal.modal('show');
    })

    dialogSendButton.on('click', async function() {
        let markId = dialogSelect.val();
        // console.log(markId);
        await fetch(`http://localhost:8080/api/tasks/update/mark/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ ready: true, mark: markId }),
            headers: { 'Content-Type': 'application/json' }
        }).then((data) => {
            return data.json();
        }).then((rep) => {
            modal.modal('hide');
            location.reload();
        })
    })
});