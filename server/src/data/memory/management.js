class ProductManager{
    static events = []
    
    constructor(data){
  
    }

    create(data) {
        const eventProduct = {
            id: ProductManager.events.length === 0 ? 1 : ProductManager.events[ProductManager.events.length - 1].id + 1,
            title : data.title,
            locality : data.locality,
            price : data.price || 10,
            stock : data.stock || 50,
            photo: data.photo,
            date : data.date || new Date()
        }
        ProductManager.events.push(eventProduct)
    }
    read(){
        return ProductManager.events
    }
    readOne(id){
        return ProductManager.events.find((each) => each.id === Number(id));
    }
}

const events = new ProductManager({
    title: "dip belt",
    locality: "calisthencis store",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gymreapers.com%2Fproducts%2Fgymreapers-dip-belt&psig=AOvVaw38iY0Vcu3BophfrRVmSbF0&ust=1702525483229000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOibj-e_i4MDFQAAAAAdAAAAABAF",
    price: 40,
    stock: 20,
})

events.create({
    title: "lifting belt",
    locality: "powerlifting store",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.raiselower.co.nz%2Fproducts%2Fsbd-belt-2021&psig=AOvVaw3V-QpvxG7YE4ZG_paii7O1&ust=1702525525020000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCuqPu_i4MDFQAAAAAdAAAAABAE",
    price: 35,
    stock: 100,
})

events.create({
    title: "knee sleeves",
    locality: "powerlifting store",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fus.sbdapparel.com%2Fproducts%2F7mm-knee-sleeves&psig=AOvVaw0iDEhfbGt848Y6Uj-5N9zF&ust=1702525560296000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjz64vAi4MDFQAAAAAdAAAAABAE",
    price: 20,
    stock: 30,
})

events.create({
    title: "climbing rope",
    locality: "calisthenics store",
    photo: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.sg%2FVOXLOVA-Climbing-Outdoor-Strength-Rappelling%2Fdp%2FB08FXT69S6&psig=AOvVaw2Z_qHf3G2yiZrS9lbyI2aw&ust=1702525584435000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLCT7pnAi4MDFQAAAAAdAAAAABAD",
    price: 10,
    stock: 50,
})

console.log(events.read());
//text to test sprint2
//console.log(events.readOne(2));