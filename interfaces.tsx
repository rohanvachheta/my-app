export interface responseProps {
  pagination: Pagination;
  data?: DataEntity[] | [];
  info: Info;
  config: Config;
}
export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}
export interface DataEntity {
  id: number;
  api_model: string;
  api_link: string;
  title: string;
  is_featured: boolean;
  description?: string | null;
  short_description?: string | null;
  web_url?: string | null;
  image_url?: string | null;
  type?: string | null;
  status: string;
  aic_start_at: string;
  aic_end_at: string;
  date_display?: null;
  department_display?: string | null;
  gallery_id?: number | null;
  gallery_title?: null;
  artwork_ids?: (number | null)[] | null;
  artwork_titles?: (string | null)[] | null;
  artist_ids?: (number | null)[] | null;
  site_ids?: null[] | null;
  image_id?: string | null;
  alt_image_ids?: (string | null)[] | null;
  document_ids?: (string | null)[] | null;
  suggest_autocomplete_all: SuggestAutocompleteAll;
  last_updated_source: string;
  last_updated: string;
  timestamp: string;
}
export interface SuggestAutocompleteAll {
  input?: string[] | null;
  contexts: Contexts;
}
export interface Contexts {
  groupings?: string[] | null;
}
export interface Info {
  license_text: string;
  license_links?: string[] | null;
  version: string;
}
export interface Config {
  iiif_url: string;
  website_url: string;
}
