import {writeFile} from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import connectDb from '@/db/connectDb';
import Sem from '@/modals/Sem';
import {mkdir} from 'fs/promises';
//for big projects use Cloud Storage
export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const email = formData.get('email');
  const name = formData.get('name');
  const sem = formData.get('sem');
    const sub=formData.get('sub')
  if (!file || !email) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), '/public/uploads');
  await mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  const publicPath = `/uploads/${fileName}`;

  await writeFile(filePath, buffer);

  await connectDb();
  const record = await Sem.create({
    email,
    name,
    sem,
    sub,
    paper: publicPath,
  });

  return NextResponse.json({ success: true, path: publicPath });
}