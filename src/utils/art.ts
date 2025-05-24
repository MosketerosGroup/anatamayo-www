import type { childrenNode, GalleryDetail, GalleryDetailFlatImage, productNodeFlatImage } from "@/interfaces/galleryDetail";
import type { Art, FlatAttribute, FlatImage, GraphqlGalleryAndArts } from "@/interfaces/art";

import CONSTANTS from "@/data/config.json";
import { getBestImageFromSrcSet, getHigherImageFromSrcSet } from "@/utils/utils";

const IMAGE_MIN_WIDTH = 350;


export const getArt = async (imageMinWidth = IMAGE_MIN_WIDTH, galleryId : string, artId : string) => {
  try {
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          productCategory (id: ${galleryId}, idType: DATABASE_ID) {
            name
            databaseId
            products (where: {categoryId: ${galleryId}, status: "publish"}, last: 50) {
              nodes {
                databaseId
                name
                slug
                status
                attributes {
                  nodes {
                    name
                    label
                    options
                  }
                }
                galleryImages {
                  nodes {
                    databaseId
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
    const graphqlResponse: GraphqlGalleryAndArts = await response.json();

    const galleryDetail = graphqlResponse.data.productCategory;
    
    const arts : Array<Art> = [];
    // const products : Array<productNodeFlatImage> = [];

    galleryDetail.products.nodes.map((product) => {

      const gallery : Array<FlatImage> = [];
      const attributes : Array<FlatAttribute> = [];

      product.galleryImages.nodes.map((galleryImage) => {
        const thumbnailUrl = getBestImageFromSrcSet(galleryImage.srcSet, imageMinWidth);
        const bestImageUrl = getHigherImageFromSrcSet(galleryImage.srcSet);
        gallery.push({
          thumbnailUrl: thumbnailUrl,
          url: bestImageUrl
        });
      })

      product.attributes.nodes.map((attribute) => {
        attributes.push({
          name: attribute.name,
          label: attribute.label,
          content: attribute.options[0]
        })
      })

      arts.push({
        databaseId: product.databaseId,
        name: product.name,
        attributes: attributes,
        gallery: gallery
      });
    })

    // // Order items according to "databaseId" value
    // arts.sort((a,b) => (a.databaseId - b.databaseId));

    return arts;
  } 
  catch (error) {
    console.error("Error loading gallery: ", error);
  }
};
