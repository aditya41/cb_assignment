$(() => {
    $('#logout').click(() => {
        console.log(localStorage.getItem('token'))

        $.ajax({

            url: "/logout",
            type: "POST",
            // data: JSON.stringify({ email, password }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function(req) {
                req.setRequestHeader('authorization', `${localStorage.getItem('token')}`);
            },
            success: function(data) {
                console.log('loggedout')
                localStorage.removeItem('token')
                console.log('after', localStorage.getItem('token'))
                    // console.log(document.cookie)
                    // console.log(data);
                window.location.replace('/login.html')
            },
            error: function(e) {
                localStorage.removeItem('token')
                window.location.replace('/login.html')
                console.log(e)
            }
        });
    })
})