(function () {
    console.log("@@@@@@@@@@@@@@@@@@@@@")
    console.log("@@@@@@@@@@@@@@@@@@@@@")
    console.log("@@@@@@@@@@@@@@@@@@@@@")
    console.log("LOADED SCRIPT ON HERE")
    console.log("@@@@@@@@@@@@@@@@@@@@@")
    console.log("@@@@@@@@@@@@@@@@@@@@@")
    console.log("@@@@@@@@@@@@@@@@@@@@@")

    let selection = null;
    
    document.addEventListener("click", async () => {
        if (selection) {
            await fetch(`${API_URL}?key=${KEY}&word=${selection}`, {
                method: 'GET',
                mode: 'no-cors', 
            });
            selection = null
        }
    })

    document.addEventListener("selectionchange", event => {
        selection = document.getSelection ? document.getSelection().toString() : document.selection.createRange().toString();
    })

})();