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

interface productCategory {
  name: string;
  databaseId: number;
  description: string;
  products: products;
}

interface data {
  productCategory: productCategory;
}

export interface GalleryDetail {
  data: data;
  extensions: any;
}

export type GalleryDetailFlatImage = Omit<productCategory, "products"> & {
  products: Array<productNodeFlatImage>;
}