document.querySelector("#signout").addEventListener("click", async() => {
    try{
        localStorage.getItem("token")
        const opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }
        let response = await fetch("/api/sessions/logout", opts)
        response = await  response.json()
        alert(response.message)
        if(response.statusCode === 200){
            location.replace("/")
            localStorage.removeItem("token")
        }
    } catch (error){
        console.log(error);
        return error;
        
    }
})