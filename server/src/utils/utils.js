function notFoundID(one){
    if(!one){
        const error = new Error("There's nothing with the corresponding ID")
        error.statusCode = 404;
        throw error;
    }
    return one
} export default notFoundID;