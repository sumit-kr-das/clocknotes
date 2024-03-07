import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const getSession = async () => {
  const getUsersSession = await getServerSession(authOptions);
  if (!getUsersSession) throw new Error("unauthorized");
  return getUsersSession.user;
};

export default getSession;
