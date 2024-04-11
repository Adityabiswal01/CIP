const express=require('express')
const mongoose=require('mongoose')
 const cors=require('cors')
 const bodyparser=require('body-parser')
 const userRoutes=require('./routes/userRoutes')
 const vacationRoutes=require('./routes/holidayRoute')

const URL="mongodb+srv://adityabiswal786:ZHFZKlp28SfIDQ7w@cluster0.c75cvim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const connectToDb =async()=>{
    try {
        await mongoose.connect(URL);
        console.log("connected to the database");
    } catch (error) {
        throw error;
    }
}
const app =express()

app.use(cors())
//app.use(bodyparser)
app.use(express.json())
app.use('/api/user',userRoutes);
app.use('/api/vacation',vacationRoutes);

app.listen(8008,()=>{
    connectToDb()
    console.log("connected to the backend")
})

