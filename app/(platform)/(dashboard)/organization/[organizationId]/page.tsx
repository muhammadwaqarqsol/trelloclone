import { db } from "@/lib/db";
import Board from "./board";
import { Form } from "./form";

const OrganizationIdPage = async () => {
  const board = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {board.map((board) => (
          <Board title={board.title} id={board.id} key={board.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
