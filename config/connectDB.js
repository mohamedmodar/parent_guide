const mongoose = require ("mongoose");

module.exports = async ()=>{

    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log(" conected to database ");
    }
    catch(error){
        console.log("connecting faild to database" , error);
    }
}
