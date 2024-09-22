import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //const username = req.query.username || '';
    const allUsers = await User.find({_id:{$ne:loggedInUserId}}).select('-password');

//   allUsers.forEach( (u) => {
//        console.log(u.fullname);  
//     } );

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in getUsersforsidebar", error.message);
  }
};
