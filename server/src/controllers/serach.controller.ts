import { Request, Response } from "express";
import prisma from "../config/prismaClient";

export const search = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });

    res.json({ tasks, projects, users });
  } catch (error: any) {
    res.status(500).json({ error: `Error doing the search: ${error.message}` });
  }
};
