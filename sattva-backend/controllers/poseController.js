import Pose from "../models/Pose.js"


export const getAllPoses = async (req,res)=> {
    try{
        const poses = await Pose.find();
        res.json(poses);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

export const getPoseByName = async (req,res)=>{
    try {
    const name = req.params.name.toLowerCase();
    const pose = await Pose.findOne({ name: new RegExp(`^${name}$`, "i") });

    if (!pose) {
      return res.status(404).json({ message: "Pose not found" });
    }

    res.json(pose);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPose = async (req, res) => {
  try {
    // ✅ If array → insert many
    // if (Array.isArray(req.body)) {
    //   const poses = await Pose.insertMany(req.body);
    //   return res.status(201).json(poses);
    // }

    // ✅ If single object → create one
    const pose = await Pose.create(req.body);
    res.status(201).json(pose);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//update a pose by name
export const updatePose = async (req,res) => {
  try{
    const {name}=req.params;

    const updatedPose = await Pose.findOneAndUpdate(
      {name : new RegExp(`^${name}$`,"i")},//case-insensitive
      req.body,
      {new:true}
    );

    if(!updatedPose){
      return res.status(404).json({message: "Pose not found"});
    }

    res.json(updatedPose);
  }catch(error){
    res.status(400).json({message: error.message});
  }
};

//delete pose

export const deletePose = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPose = await Pose.findByIdAndDelete(id);

    if (!deletedPose) {
      return res.status(404).json({ message: "Pose not found" });
    }

    res.json({ message: "Pose deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
