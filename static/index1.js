$(() => {
    // console.log(document.cookie)
    // $.ajax({
    //     type: 'GET',
    //     url: 'http:localhost:4444/getsobs',
    //     data: {
    //         token: document.cookie
    //     },
    //     success: function(data) {
    //         console.log(data)
    //     }
    // })

    // if (!document.cookie || document.cookie == "")
    //     window.location.replace('/login.html')

    if (localStorage.getItem('token')) {
        $('#login').css('hidden', 'true').hide()
        $('#head').hide()
    } else {
        $('#logout').hide()
    }

    $.get({
            url: `http://localhost:4444/getJobs`,
            beforeSend: function(req) {
                console.log('ser')
                req.setRequestHeader('authorization', `${localStorage.getItem('token')}`);
                // req.header.Auth = localStorage.getItem('token')
            }
        }, (data) => {
            // temperature = data.main.temp
            let final = '';
            // console.log(data.length)
            data.forEach(({ companyName, jobId, jobTitle, description, ctc }) => {
                final += `<div class="cardBottom col-4">
            <div class="job-card" >
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        
                        <h5 class="card-title">${companyName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${ctc}</h6>
                        <p class="card-text">${jobTitle}</p>
                        <p class="card-text">${description.substring(0,11)+"..."}</p>
                        <a href="viewMore.html?id=${jobId}" class="btn btn-info">View More</a>
                    </div>
                </div>
            </div>
        </div>`
            })
            document.getElementById("row").innerHTML = final;
        })
        // $.get('/getjobs', function(d){
        //     console.log(d)
        // });
})