export interface Semester {
  id: number;
  label: string;
  is_active: boolean;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  semester_id: number;
  description?: string;
  credits?: number;
  slug: string;
  icon_name: string;
  route: string; // e.g. '/semester-5/machine-learning'
  resources?: {
    notes: any[];
    series_questions: any[];
    model_questions: any[];
    pyq: any[];
    syllabus: any[];
    lab_questions: any[];
    assignments: any[];
    mini_projects: any[];
    reference_books: any[];
    reference_videos: any[];
    youtube_classes: any[];
  };
}

export type ResourceCategorySlug = 
  | 'notes' 
  | 'series-questions' 
  | 'model-questions' 
  | 'pyq' 
  | 'syllabus' 
  | 'lab-questions' 
  | 'youtube' 
  | 'assignments';

export interface ResourceCategory {
  slug: ResourceCategorySlug;
  label: string;
  description: string;
  icon_name: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  subject_id: string;
  category_slug: ResourceCategorySlug;
  module_number?: number; // 1 to 6, optional for notes
  is_verified?: boolean;
  file_size?: string; // e.g., '2.4 MB'
  file_type?: string; // e.g., 'PDF', 'Link'
  download_count?: number;
  created_at: string;
}
