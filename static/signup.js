// const { json } = require("express")

console.log('load?')
$(() => {
    $('#btn').click((e) => {
        e.preventDefault()
        let email = $('#inputEmail').val()
        let name = $('#inputName').val()
        let phoneNumber = $('#inputNumber').val()
        let password = $('#inputPassword').val()
            // console.log(email)
        console.log('gh')
        $.ajax({
            url: "/signup",
            type: "POST",
            data: JSON.stringify({ email, password, phoneNumber, name }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function(data) {

                localStorage.setItem('token', data.token)

                console.log(data);
                window.location.replace('/index.html')
            }
        });
        // $.post('http://localhost:4444/signup', {
        // $.ajax({
        //         type: 'POST',
        //         url: 'http://localhost:4444/signup',
        //         dataType: "json",
        //         data: {
        //             email: email
        //                 // name,
        //                 // password,
        //                 // phoneNumber,

        //         },
        //         success: function(data) {
        //                 console.log(data)
        //             }
        //             // dataType: 'json'
        //     })
        // $.post("/signup", { name: "John", time: "2pm" }, undefined, "json")
        //     .done(function(data) {
        //         alert("Data Loaded: " + data);
        //     });

        // }, (data, status) => {
        //     console.log(data, status)
        //     if (status == 'success')
        //         window.location.replace('/index.html')
        // })
    })
})