class UserManager{
    static events = []
    
    constructor(data){
     
    }

    create(data) {
        const eventProduct = {
            id: UserManager.events.length === 0 ? 1 : UserManager.events[UserManager.events.length - 1].id + 1,
            name : data.name,
            photo: data.photo,
            email: data.email,
            date : data.date || new Date()
        }
        UserManager.events.push(eventProduct)
    }
    read(){
        return UserManager.events
    }
    readOne(id){
        return UserManager.events.find((each) => each.id === Number(id));
    }
}

const events = new UserManager({
    name: "men-sup",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.luegopago.com%2Fproductos%2Ff6979fa4-9cbc-412e-88e0-0aaccccf0f4d-centrum-men-hombre-200-tabletas&psig=AOvVaw31q-Ly7pKJWcaKbuIiENUY&ust=1702524890696000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCM4s29i4MDFQAAAAAdAAAAABAE",
    email: "somethin1.@email.com",
})

events.create({
    name: "magnesium",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.misvitaminas.com.co%2Fmagnesium-citrate-400-mg-now&psig=AOvVaw2q6dMlJYEsUc8Kj6dd78X7&ust=1702525328410000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjigp6_i4MDFQAAAAAdAAAAABAD",
    email: "somethin2.@email.com",
})

events.create({
    name: "omega3",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.exito.com%2Fomega-3-199861%2Fp&psig=AOvVaw2wI7xsFMIGW6xhFVOcAkG-&ust=1702525398408000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNCG6r6_i4MDFQAAAAAdAAAAABAE",
    email: "somethin3.@email.com",
})

events.create({
    name: "melatonin",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffitnesspeople.com.co%2Fproducts%2Fmelatonina-now-5mg&psig=AOvVaw0Ys46nVVEDsGZ_PR93AHpB&ust=1702525428194000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCND27sy_i4MDFQAAAAAdAAAAABAE",
    email: "somethin4.@email.com",
})


console.log(events.read());
console.log(events.readOne(1));