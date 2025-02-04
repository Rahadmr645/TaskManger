import mongoose from 'mongoose';


const URL = 'mongodb+srv://rahadmr645:12345678@cluster0.8cjdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectToMongoDb = async () => {
    try {
        await mongoose.connect(URL,{})
       console.log("DB connected")
    } catch (error) {
        console.log('faild to connected',error)
    }
}
   
export default connectToMongoDb;