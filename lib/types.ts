// types/agency.ts
export type SuccessStory = {
  id: string;
  agency_id: string;
  image: string;
};

export type AgencyUser = {
  id: string;
  name: string;
  email: string;
};

export type Agency = {
  id: string;
  name: string;
  logo: string;
  description: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  established_year: number;
  director_name: string;
  website: string;
  facebook_url: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  approved_at: string | null;
  approved_by_id: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: AgencyUser;
  success_stories: SuccessStory[];
  category?: string;
  location?: string;
  profileLink?: string;
  websiteLink?: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  is_approved: boolean;
  is_published: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  approved_at: string;
  approved_by_id: string;
  approved_by: {
    id: string;
    name: string;
    email: string;
  };
  author_id: string;
  author: {
    id: string;
    name: string;
    email: string;
    profile_picture:string;
  };
};

export interface EventAuthor {
  id: string;
  name: string;
  email: string;
  profile_picture: string | null;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  location: string;
  author_id: string;
  author: EventAuthor;
  event_date: string;     
  created_at: string;    
  updated_at: string;     
  is_deleted: boolean;
}