"use server";
import db from "@/lib/db";
import getActivityTime from "@/lib/get-activity-time";
import dayjs from "dayjs";
export const getWeeklyActivityReport = async ({
  workspaceId,
  users,
  projects,
  tags,
  status,
  clients,
}: {
  workspaceId: string;
  users?: string[];
  projects?: string[];
  tags?: string[];
  status?: boolean[];
  clients?: string[];
}) => {
  const now = dayjs().endOf("day");
  const sevenDaysAgo = dayjs().startOf("day").subtract(6, "day"); // Set sevenDaysAgo to the start of 7 days ago
  let query: any = {
    where: {
      workspaceId: workspaceId,
      startAt: {
        gte: sevenDaysAgo.toDate(),
        lte: now.toDate(),
      },
    },
  };
  if (projects && projects.length > 0) {
    query.where.projectId = {
      in: projects,
    };
  }
  if (users && users.length > 0) {
    query.where.userId = {
      in: users,
    };
  }
  if (clients && clients.length > 0) {
    query.where.clientId = {
      in: clients,
    };
  }
  if (status && status.length > 0) {
    if (status.includes(true) && status.includes(false)) {
      // If both true and false are included, no filter is needed
    } else if (status.includes(true)) {
      query.where.isBillable = true;
    } else if (status.includes(false)) {
      query.where.isBillable = false;
    }
  }
  if (tags && tags.length > 0) {
    query.where.tagId = {
      in: tags,
    };
  }

  const activities = await db.activity.findMany(query);

  const activityTimeByDay = Array(7).fill(0);
  const dates = [];
  let totalActivityTime = 0;
  for (let i = 0; i < 7; i++) {
    const date = sevenDaysAgo.add(i, "day");
    dates.push(date.format("YYYY-MM-DD"));
  }
  let groupActivityTime: { [key: string]: number } = {};

  // let projectActivityTime: { [projectId: string]: number } = {};

  activities.forEach((activity) => {
    const startAt = dayjs(activity.startAt);
    const durationMinutes = getActivityTime(activity.startAt, activity.endAt);

    const dayIndex = startAt.diff(sevenDaysAgo, "day");
    activityTimeByDay[dayIndex] += durationMinutes;
    totalActivityTime += durationMinutes;
  });

  return {
    activities: activityTimeByDay,
    dates,
    totalActivityTime,
  };
};

export const getFilterReportData = async ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  try {
    const projects = await db.project.findMany({
      where: {
        workspaceId: workspaceId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const tags = await db.tag.findMany({
      where: {
        workspaceId: workspaceId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    const users = await db.team.findMany({
      where: {
        workspaceId: workspaceId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    const clients = await db.client.findMany({
      where: {
        workspaceId: workspaceId,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return {
      projects: projects,
      tags: tags,
      users: users?.map((item) => item?.user),
      clients: clients,
      status: [
        { name: "Billable", value: true },
        { name: "Not Billable", value: false },
      ],
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const getActivityReportByProjects = async ({
  workspaceId,
  users,
  projects,
  tags,
  status,
  clients,
}: {
  workspaceId: string;
  users?: string[];
  projects?: string[];
  tags?: string[];
  status?: boolean[];
  clients?: string[];
}) => {
  const now = dayjs().endOf("day");
  const sevenDaysAgo = dayjs().startOf("day").subtract(6, "day");

  let query: any = {
    where: {
      workspaceId: workspaceId,
      startAt: {
        gte: sevenDaysAgo.toDate(),
        lte: now.toDate(),
      },
    },

    include: {
      project: true,
    },
  };

  if (projects && projects.length > 0) {
    query.where.projectId = {
      in: projects,
    };
  }
  if (users && users.length > 0) {
    query.where.userId = {
      in: users,
    };
  }
  if (clients && clients.length > 0) {
    query.where.clientId = {
      in: clients,
    };
  }
  if (status && status.length > 0) {
    if (status.includes(true) && status.includes(false)) {
      // If both true and false are included, no filter is needed
    } else if (status.includes(true)) {
      query.where.isBillable = true;
    } else if (status.includes(false)) {
      query.where.isBillable = false;
    }
  }
  if (tags && tags.length > 0) {
    query.where.tagId = {
      in: tags,
    };
  }

  const activities: any = await db.activity.findMany(query);

  let projectActivityTime: { [projectName: string]: number } = {};

  activities.forEach((activity: any) => {
    const projectName = activity?.project?.name || "Unknown Project";
    const durationMinutes = getActivityTime(activity.startAt, activity.endAt);

    if (!projectActivityTime[projectName]) {
      projectActivityTime[projectName] = 0;
    }
    projectActivityTime[projectName] += durationMinutes; // Convert minutes to hours
  });

  const projectsData = Object.keys(projectActivityTime);
  const times = projectsData.map(
    (projectName) => projectActivityTime[projectName],
  );
  return { projectsData, times };
};

export const getActivityReportByUsers = async ({
  workspaceId,
  users,
  projects,
  tags,
  status,
  clients,
}: {
  workspaceId: string;
  users?: string[];
  projects?: string[];
  tags?: string[];
  status?: boolean[];
  clients?: string[];
}) => {
  const now = dayjs().endOf("day");
  const sevenDaysAgo = dayjs().startOf("day").subtract(6, "day");
  const query: any = {
    where: {
      workspaceId: workspaceId,
      startAt: {
        gte: sevenDaysAgo.toDate(),
        lte: now.toDate(),
      },
    },
    include: {
      user: true,
    },
  };

  if (projects && projects.length > 0) {
    query.where.projectId = {
      in: projects,
    };
  }
  if (users && users.length > 0) {
    query.where.userId = {
      in: users,
    };
  }
  if (clients && clients.length > 0) {
    query.where.clientId = {
      in: clients,
    };
  }
  if (status && status.length > 0) {
    if (status.includes(true) && status.includes(false)) {
      // If both true and false are included, no filter is needed
    } else if (status.includes(true)) {
      query.where.isBillable = true;
    } else if (status.includes(false)) {
      query.where.isBillable = false;
    }
  }

  const activities = await db.activity.findMany(query);

  const userActivityTime: { [userId: string]: number } = {};

  activities.forEach((activity: any) => {
    const userName = activity?.user?.name || "Unknown Project";
    const durationMinutes = getActivityTime(activity.startAt, activity.endAt);

    if (!userActivityTime[userName]) {
      userActivityTime[userName] = 0;
    }
    userActivityTime[userName] += durationMinutes / 60; // Convert minutes to hours
  });

  const userData = Object.keys(userActivityTime);
  const times = userData.map((name) => userActivityTime[name]);

  return { userData, times };
};
