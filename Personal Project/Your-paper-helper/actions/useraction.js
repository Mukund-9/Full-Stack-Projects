"use server"
import connectDb from "@/db/connectDb"
import User from "@/modals/User"
import Sem from "@/modals/Sem"
export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}
export const fetchpapers = async (semester) => {
    await connectDb()
    let p = await Sem.find({ sem: semester })
    let papers = p.map(doc => doc.toObject({ flattenObjectIds: true }))
    return papers
}
export const updateProfile = async (data, oldusername) => {
  await connectDb();
  const ndata = data; // <-- data is already an object

  if (oldusername !== ndata.username) {
    const u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
  }
};

export const updatePaper = async (paper) => {
    await connectDb()
    const newPaper = await Sem.create(paper)
    return newPaper.toObject({ flattenObjectIds: true })

}
