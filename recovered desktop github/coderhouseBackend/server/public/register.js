console.log("register greetings");
const socket = io();



//socket.on("welcome", message => alert((message)));
/*
socket.emit("new product added" , {
    name: "Nike Romaleos lifting shoes",
    place: "Nike department store",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ro_Pg3OmLZzm9MXO4cNiMIw1ftC7p7NZ2dw-yfox6Gv7TZqjxQC7o_dQPrkSXNgmoRo&usqp=CAU",
    price: "$50",
    capacity: 600,
    date: new Date(),
})*/

socket.on("product added success", (message) => alert(message));

document.querySelector("#newAddProduct").addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const img = document.querySelector("#img").value;
  const price = document.querySelector("#price").value;
  const place = document.querySelector("#place").value;
  const date = document.querySelector("#date").value;
  const capacity = document.querySelector("#capacity").value;

  const data = {};
  name && (data.name = name);
  img & (data.img = img);
  price && (data.price = price);
  place && (data.place = place);
  date && (data.date = date);
  capacity && (data.capacity = capacity);

  console.log("data is:", data);
  socket.emit("new product added", data);
});
