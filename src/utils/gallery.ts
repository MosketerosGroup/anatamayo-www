import type { childrenNode, GalleryDetail, GalleryDetailFlatImage, productNodeFlatImage } from "@/interfaces/galleryDetail";

import CONSTANTS from "@/data/config.json";
import { getBestImageFromSrcSet } from "@/utils/utils";

const IMAGE_MIN_WIDTH = 350;


export const getGallery = async (imageMinWidth = IMAGE_MIN_WIDTH, galleryId : string) => {
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
            slug
            databaseId
            products (where: {categoryId: ${galleryId}, status: "publish"}) {
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
            children {
              nodes {
                slug
                description
              }
            }
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

    // Get subdescription
    const children : Array<childrenNode> = galleryDetail.children.nodes;
    const childSubdescription : Array<childrenNode> = children.filter((child) => (child.slug === `${galleryDetail.slug}-subdescription`));

    console.debug('filter', `${galleryDetail.slug}-subdescription`);
    console.debug('galleryDetail.children.nodes', galleryDetail.children.nodes);
    console.debug('graphqlResponse', graphqlResponse);

    const galleryDetailFlatImage : GalleryDetailFlatImage = {
      name: galleryDetail.name,
      databaseId: galleryDetail.databaseId,
      description: galleryDetail.description,
      products: products,
      subdescription: childSubdescription[0]?.description ?? ''
    }

    console.debug('gallteryDestail', galleryDetailFlatImage);

    return galleryDetailFlatImage;
  } 
  catch (error) {
    console.error("Error loading gallery: ", error);
  }
};
