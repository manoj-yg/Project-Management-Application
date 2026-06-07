import mongoose,{Schema} from "mongoose";

const Blog = mongoose.model("Blog", blogSchema);
// ready to go!

const schema = new Schema();
schema.path('_id');