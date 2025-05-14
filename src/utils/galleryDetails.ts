import type { GalleryDetail, GalleryDetailFlatImage, productNodeFlatImage } from "@/interfaces/galleryDetail";

import CONSTANTS from "@/data/config.json";
import { getBestImageFromSrcSet } from "@/utils/utils";

const IMAGE_MIN_WIDTH = 350;


export const getGalleryDetails = async (imageMinWidth = IMAGE_MIN_WIDTH, galleryId : string) => {
  try {
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          productCategory(id: ${galleryId}, idType: DATABASE_ID) {
            name
            databaseId
            products (where: {categoryId: ${galleryId}}) {
              nodes {
                databaseId
                name
                slug
                status
                featuredImage {
                  node {
                    srcSet
                  }
                }
              }
            }
            description
          }
        }`,
      }),
    };
    const response = await fetch(CONSTANTS.BASE_URL + "/graphql", OPTIONS);
    const graphqlResponse: GalleryDetail = await response.json();

    const galleryDetail = graphqlResponse.data.productCategory;

    const products : Array<productNodeFlatImage> = [];
    galleryDetail.products.nodes.map((product) => {
      products.push({
        databaseId: product.databaseId,
        name: product.name,
        status: product.status,
        image: getBestImageFromSrcSet(product.featuredImage.node.srcSet, 350),
      });
    })

    // Order items according to "databaseId" value
    products.sort((a,b) => (a.databaseId - b.databaseId));

    const galleryDetailFlatImage : GalleryDetailFlatImage = {
      name: galleryDetail.name,
      databaseId: galleryDetail.databaseId,
      description: galleryDetail.description,
      products: products.filter((product) => (product.status === 'publish'))
    }

    return galleryDetailFlatImage;
  } 
  catch (error) {
    console.error("Error loading gallery: ", error);
  }
};
