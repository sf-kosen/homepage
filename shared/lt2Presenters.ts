export type Lt2Presenter = {
  id: string;
  name: string;
  title: string;
  ownerDiscordId?: string;
  discordId?: string;
  status: "active" | "cancelled";
};

export const lt2Presenters: Lt2Presenter[] = [
  {
    id: "lt2-tbd-1",
    name: "Coming Soon",
    title: "TBD",
    ownerDiscordId: "957974197953511524",
    discordId: "957974197953511524",
    status: "active",
  },
  { id: "lt2-tbd-2", name: "Coming Soon", title: "TBD", status: "active" },
];
