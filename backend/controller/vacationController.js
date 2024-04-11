const Holiday = require("../models/Holoday");

const createAVacation =async(req,res)=>{
try {
    console.log(req.body)
    const { name, date, Destination, startingDate, endingDate, location, category, description } = req.body;
    const newVacation = new Holiday({
        name,
        date,
        Destination,
        startingDate,
        endingDate,
        location,
        category,
        description
    });
    const savedVacation = await newVacation.save();
    res.status(201).json(savedVacation);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}
const updateVacation = async (req, res) => {
    try {
        const { id } = req.params; 
        const update = req.body; 

       
        const updatedVacation = await Holiday.findByIdAndUpdate(id, update, { new: true });

        if (!updatedVacation) {
            return res.status(404).json({ message: 'Vacation not found' });
        }

        res.json(updatedVacation); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAvacation=async(req,res)=>{
    try {
        const{id}=req.params;
        const vaca=await Holiday.findById(id);
        if(!vaca){
          return  res.status(403).json("vacation not found");
        }
        res.status(201).json(vaca)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getAllvacation =async(req,res)=>{
    try {
        const allvacation=await Holiday.find()
        res.status(201).json(allvacation)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={createAVacation,updateVacation,getAvacation,getAllvacation}