interface srcSet {
  srcSet: string;
}

interface featuredImageNode {
  node: srcSet;
}

interface productNode {
  databaseId: number;
  name: string;
  status: string;
  featuredImage: featuredImageNode;
}

export type productNodeFlatImage = Omit<productNode, "featuredImage"> & {
  image: string;
}

interface products {
  nodes: Array<productNode>;
}

export interface childrenNode {
  databaseId: number;
  name: string;
  slug: string;
  description: string;
}

interface children {
  nodes: Array<childrenNode>;
}

interface productCategory {
  name: string;
  slug: string;
  databaseId: number;
  description: string;
  products: products;
  children: children;
}

interface data {
  productCategory: productCategory;
}

export interface GalleryDetail {
  data: data;
  extensions: any;
}

export type GalleryDetailFlatImage = Omit<productCategory, "products" | "slug" | "children"> & {
  products: Array<productNodeFlatImage>;
  subdescription: string;
  additionalDescriptions: Array<childrenNode> | null;
}