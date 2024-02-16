import {connect} from "mongoose";
const dbUrl = "mongodb+srv://jsuarez0698:Juancho3000.@cluster0.a2fkvku.mongodb.net/worldsthenics"
const dbConnection = async() => {
    try{
        await connect(dbUrl)
        console.log("database connected");
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;