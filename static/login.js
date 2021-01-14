$(() => {
    $('#btn').click((e) => {
        e.preventDefault()
        let email = $('#inputEmail').val()
        let password = $('#inputPassword').val()
            // console.log(email),

        $.ajax({

            url: "/login",
            type: "POST",
            data: JSON.stringify({ email, password }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(data) {

                localStorage.setItem('token', data.token)
                    // console.log(document.cookie)
                console.log(data);
                window.location.replace('/index.html')
            }
        });

    })
    $('#btn1').click(() => {
        window.location.replace('/signup.html')
    })

})