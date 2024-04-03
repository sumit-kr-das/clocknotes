import db from "@/lib/db";
import getSession from "@/lib/get-session";
import { Role } from "@prisma/client";

// export  const createTeam = async({ workspaceId, role}:{workspaceId:string, role?:Role })=>{
//     try {
//         const user = await getSession();
//         await db.team.create({
//             data:{
//                 workspaceId: workspaceId as string,
//                 role: role as Role,
//                 tenantId: user.tenantId,
//             }
//         })
//     }
// }
