import { DeleteTodo, getTodos, updateTodo } from "../db";

export async function GET(_: any, { params }: { params: { id: string } }) {
  const id = +params.id;
  const data = await getTodos(id);
  return Response.json(data);
}

export async function DELETE(_: any, { params }: { params: { id: string } }) {
  const id = +params.id;
  await DeleteTodo(id);
  return Response.json("Deleted");
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = +params.id;
  const body = await req.json();
  updateTodo(id, body);
  return Response.json("Updated");
}
