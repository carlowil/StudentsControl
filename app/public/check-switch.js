$(document).ready(function(){
    let switchMarks = $('.flexCheckMarks')
    let switchExams = $('.flexCheckExams')

    switchMarks.on('change', async function(event) {
        let id = $(this).closest('.card').data('id');
        if (event.currentTarget.checked) {
            await fetch(`http://localhost:8080/api/users/chg/switchmarks/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ can_see_marks: 'true' }),
                headers: { 'Content-Type': 'application/json' }
            }).then((rep) => {

            })
            // alert(`checked ${id}`);
        } else {
            await fetch(`http://localhost:8080/api/users/chg/switchmarks/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ can_see_marks: 'false' }),
                headers: { 'Content-Type': 'application/json' }
            }).then((rep) => {

            })
            // alert(`unchecked ${id}`);
        }
    });

    switchExams.on('change', async function(event) {
        let id = $(this).closest('.card').data('id');
        if (event.currentTarget.checked) {
            await fetch(`http://localhost:8080/api/users//chg/switchexams/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ can_see_exams: 'true' }),
                headers: { 'Content-Type': 'application/json' }
            }).then((rep) => {

            })
            // alert(`checked ${id}`);
        } else {
            await fetch(`http://localhost:8080/api/users//chg/switchexams/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ can_see_exams: 'false' }),
                headers: { 'Content-Type': 'application/json' }
            }).then((rep) => {

            })
            // alert(`unchecked ${id}`);
        }
    });

});