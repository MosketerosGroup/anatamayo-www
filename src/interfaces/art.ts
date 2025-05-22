interface nodeGalleryImages {
  databaseId: number;
  srcSet: string;
}

interface galleryImages {
  nodes: Array<nodeGalleryImages>;
}

interface nodeAttributes {
  name: string;
  label: string;
  options: Array<string>;
}

interface attributes {
  nodes: Array<nodeAttributes>;
}

interface nodeProduct {
  databaseId: number;
  name: string;
  slug: string;
  status: "publish" | "draft";
  attributes: attributes;
  galleryImages: galleryImages;
}

export interface FlatImage {
  thumbnailUrl: string;
  url: string;
}

export interface FlatAttribute {
  name: string;
  label: string;
  content: string;
};

export type Art = Omit<nodeProduct, "slug" | "status" | "attributes" | "galleryImages"> & {
  attributes: Array<FlatAttribute>;
  gallery: Array<FlatImage>
}

interface products {
  nodes: Array<nodeProduct>;
}

export interface GalleryAndArts {
  name: string;
  databaseId: number;
  products: products;
  description: string;
}

interface data {
  productCategory: GalleryAndArts;
}

export interface GraphqlGalleryAndArts {
  data: data;
  extensions: any;
}