import type { GraphqlGallery, GalleryFlatImage } from "@/interfaces/gallery";

import CONSTANTS from "@/data/config.json";
import { getBestImageFromSrcSet } from "@/utils/utils";

const IMAGE_MIN_WIDTH = 350;


export const getGallery = async () => {
  try {
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          productCategories {
            nodes {
              slug
              description
              image {
                srcSet
              }
              databaseId
              name
            }
          }
        }`,
      }),
    };
    const response = await fetch(CONSTANTS.BASE_URL + "/graphql", OPTIONS);
    const graphqlResponse: GraphqlGallery = await response.json();

    const arts = graphqlResponse.data.productCategories.nodes;

    let artItems: Array<GalleryFlatImage> = [];

    for (let i = 0; i < arts.length; i++) {
      if (arts[i].slug !== "sin-categorizar") {
        artItems.push({
          databaseId: arts[i].databaseId,
          name: arts[i].name,
          slug: arts[i].slug,
          description: arts[i].description,
          image: getBestImageFromSrcSet(arts[i].image.srcSet, IMAGE_MIN_WIDTH),
        });
      }
    }

    // Order items according to "databaseId" value
    artItems.sort((a, b) => a.databaseId - b.databaseId);

    return artItems;
  } catch (error) {
    console.error("Error loading gallery: ", error);
  }
};
