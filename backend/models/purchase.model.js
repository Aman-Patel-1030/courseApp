// import mongoose from "mongoose";

// const purchaseSchema = new mongoose.Schema({
//  useId: {
//     type:mongoose.Types.ObjectId,
//     ref:"User"
//  },
//  courseId: {
//     type:mongoose.Types.ObjectId,
//     ref:"Course",
//  },

// });

// export const purchase = mongoose.model("purchase", purchaseSchema);
//ABOVE WRONG 


import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
});

export const purchase = mongoose.model("Purchase", purchaseSchema);
