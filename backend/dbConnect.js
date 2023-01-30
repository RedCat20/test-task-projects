import mongoose from 'mongoose';

const URI_STR = 'mongodb+srv://admin:1111@cluster0.otlrykd.mongodb.net/projects?retryWrites=true&w=majority';

export const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DB || URI_STR);
    console.log('Connection to database is successful');
  } catch(err) {
    console.log('Connection error: ', err);
  }
}