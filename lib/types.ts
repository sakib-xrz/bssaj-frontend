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

export interface Certificate {
  id: string;
  sl_no: string;
  name: string;
  father_name: string;
  mother_name: string;
  gender: string;
  date_of_birth: string; // ISO string
  student_id: string;
  institute_name: string;
  grade: string;
  course_duration: string;
  completed_hours: string;
  issued_at: string; // ISO string
  created_at: string; // ISO string
  updated_at: string; // ISO string
  certificate_url: string | null;

  agency_id: string;
  agency: {
    id: string;
    name: string;
  };
}


interface User {
  profile_picture: string;
}


interface ApprovedBy {
  name: string | null;
}

export interface MemberType {
  id: string;
  name: string;
  email: string;
  kind: string;
  phone: string;
  status: string;
  approved_at: string;
  created_at: string;
  member_id: string;
  user: User;
  approved_by: ApprovedBy;
}
export type NewsType = {
  id: string;
  title: string;
  content: string;
  created_at: string; 
  updated_at: string; 
  is_deleted: boolean;
};

export type AgencyPayment = {
  id: string;
  agency_id: string;
  payment_month: string; // format: YYYY-MM
  amount: string; // could be number if backend supports numeric type
  payment_date: string; // ISO timestamp
  payment_status: string;
  payment_method: string; // e.g. "Bank Transfer", "Cash"
  transaction_id: string;
  notes: string;
  approved_at: string | null; // timestamp or null
  approved_by_id: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  approved_by?: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export interface Jobs  {
  id: string;
  title: string;
  description: string;
  type: string;
  kind:string;
  company_name: string;
  company_logo: string | null;
  company_website: string | null;
  company_email: string;
  company_phone: string;
  company_address: string;
  experience_min: string;
  salary_min: string;
  salary_max: string;
  deadline: string; // ISO date string
  apply_link: string;
  number_of_vacancies: string;
  posted_by_id: string;
  is_deleted: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  approved_at: string | null; // ISO date string or null
  approved_by_id: string;
  posted_by: {
    id: string;
    name: string;
    email: string;
  };
  approved_by: {
    id: string;
    name: string;
    email: string;
  };
};
