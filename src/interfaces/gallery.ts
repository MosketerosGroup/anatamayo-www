interface srcSet {
  srcSet: string;
}

export interface Gallery {
  slug: string;
  description: string;
  image: srcSet;
  databaseId: number;
  name: string;
}

export type GalleryFlatImage = Omit<Gallery, "image"> & {
  image: string;
};

interface productCategories {
  nodes: Array<Gallery>;
}

interface data {
  productCategories: productCategories;
}

export interface GraphqlGallery {
  data: data;
  extensions: any;
}
