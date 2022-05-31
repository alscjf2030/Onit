import React from 'react';

const SSE = (props) => {
    let subscribeUrl = "https://imonint.shop/sub";

    document.ready(function() {

    if (localStorage.getItem("token") != null) {
        let token = localStorage.getItem("token");
        let eventSource = new EventSource(subscribeUrl, {headers: token});

        eventSource.addEventListener("addComment", function(event) {
            let message = event.data;
            alert(message);
        })
        eventSource.addEventListener("error", function(event) {
            eventSource.close()
        })
    }
})
    return(
        <>
        </>
    )
}

export default SSE;