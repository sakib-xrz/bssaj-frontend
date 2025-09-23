export const tagTypes = {
  user: "user",
  member: "member",
  blog: "blog",
  getMe: "getme",
  Agency: "Agency",
  News: "news",
  certificate: "certificate",
  banners: "banners",
  payments: "payments",
  jobs: "jobs",
  committees: "committees",
  gallery: "gallery",
  consultation: "consultation",
  scholarship: "scholarship",
  event:"event"
};

export const tagTypesList = [
  tagTypes.member,
  tagTypes.user,
  tagTypes.certificate,
  tagTypes.Agency,
  tagTypes.blog,
  tagTypes.News,
  tagTypes.banners,
  tagTypes.payments,
  tagTypes.jobs,
  tagTypes.committees,
  tagTypes.consultation,
  tagTypes.scholarship,
  tagTypes.gallery,
];

export type CommitteeMember = {
  id: string;
  name: string;
  designation: string;
  term_start_year: string;
  term_end_year: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
};
