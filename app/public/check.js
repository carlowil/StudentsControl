$(document).ready(function(){
    let checkButton = $('.check-button');
    let comment_text = $('#comment-text');
    let mark_text = $('#mark-text');
    let header = $('#checkModalLabel');
    checkButton.on('click', async function() {
        let taskId = $(this).closest('.card').data('id');
        await fetch(`http://localhost:8080/api/tasks/withMark/${taskId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((data) => {
            return data.json()
        }).then((task) => {
            let realTask = task.task[0];
            comment_text.text(`${realTask.comment}`);
            mark_text.text(`${realTask.mark}`);
            header.text(`${realTask.title}`);
            $("#checkModal").modal("show");
        })
    })
});