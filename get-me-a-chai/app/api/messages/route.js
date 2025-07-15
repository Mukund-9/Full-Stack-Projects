
import connectDB from "@/db/connectDb";
import Messages from "@/modals/Messages";


export async function GET() {
  await connectDB();
  const messages = await Messages.find().sort({ createdAt: -1 });
  return Response.json(messages);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const newMessage = new Messages({
    name: body.name,
    message: body.message,
  });

  const saved = await newMessage.save();
  return Response.json(saved);
}
