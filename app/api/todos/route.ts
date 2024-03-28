import { createTodo, getTodos } from "./db";

export async function GET() {
  return Response.json(getTodos());
}

export async function POST(req: Request) {
  const data = await req.json();
  await createTodo(data.text);
  return Response.json("Created");
}
