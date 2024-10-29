import { Request, Response } from "express";
import prisma from "../config/prismaClient";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching users: ${error.message}` });
  }
};
