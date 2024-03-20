const selector = document.querySelector("#newAddUser")
selector.addEventListener("click", async(event) => {
    event.preventDefault();
  try{
    const data = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        place: document.querySelector("#place").value,
        img: document.querySelector("#img").value,
        phone: document.querySelector("#phone").value,
        password: document.querySelector("#password").value
    }
    const opts = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
   let response = await fetch("/api/sessions/register", opts)
   response = await response.json();
   alert(response.message)
   console.log(response.message);
   response.session && location.replace("/sessions/login")
  } catch (error){
    alert(error.message)
  }
  });
