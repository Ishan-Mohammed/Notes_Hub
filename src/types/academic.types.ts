export type SubjectType = 'theory' | 'lab' | 'project';

export interface Department {
  id: number;
  code: string;
  name: string;
}

export interface Semester {
  id: number;
  semester_no: number;
  name: string;
}

export interface Subject {
  id: number;
  department_id: number;
  semester_id: number;
  subject_code: string;
  subject_name: string;
  slug: string | null;
  description: string | null;
  credits: number | null;
  icon_name: string | null;
  subject_type: SubjectType | null; 
}

export interface Module {
  id: number;
  subject_id: number;
  module_no: number;
  module_title: string;
}

export interface ResourceType {
  id: number;
  name: string;
  slug: string | null;
  description: string | null;
  icon_name: string | null;
  display_order: number | null;
}

export interface Resource {
  id: number;
  subject_id: number;
  module_id: number | null;
  resource_type_id: number;
  title: string;
  year: number | null;
  file_url: string | null;
  youtube_url: string | null;
  description: string | null;
  uploaded_at: string | null;
  file_type: string | null;
  download_count: number | null;
  is_verified: boolean | null;
  file_size: string | null;
  resource_types?: Pick<ResourceType, 'slug' | 'name' | 'icon_name'>;
  modules?: Pick<Module, 'module_no'>;
}
