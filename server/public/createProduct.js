const selector = document.querySelector("#newProduct")
selector.addEventListener("click", async(event) => {
    event.preventDefault();
  try{
    const data = {
        name: document.querySelector("#name").value,
        price: document.querySelector("#price").value,
        place: document.querySelector("#place").value,
        img: document.querySelector("#img").value,
        capacity: document.querySelector("#capacity").value,
        date: document.querySelector("#date").value
    }
    const opts = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    }
   let response = await fetch("/api/products", opts)
   response = await response.json();
   alert(response.message)
   console.log(response.message);
   response.session && location.replace("/")
  } catch (error){
    alert(error.message)
  }
  });
