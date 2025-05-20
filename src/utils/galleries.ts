import type { GraphqlGallery, GalleryFlatImage } from "@/interfaces/gallery";

import CONSTANTS from "@/data/config.json";
import { getBestImageFromSrcSet } from "@/utils/utils";

const IMAGE_MIN_WIDTH = 350;


export const getGalleries = async (imageMinWidth = IMAGE_MIN_WIDTH, gallerySlug? : string) => {
  try {
    const OPTIONS = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          productCategories(where: {parent: null}) {
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

    const artItems: Array<GalleryFlatImage> = [];

    if (gallerySlug) {
      const filteredArts = arts.filter((art) => (art.slug === gallerySlug));

      (filteredArts.length > 0) &&
        artItems.push({
          databaseId: filteredArts[0].databaseId,
          name: filteredArts[0].name,
          slug: filteredArts[0].slug,
          description: filteredArts[0].description,
          image: getBestImageFromSrcSet(filteredArts[0].image.srcSet, imageMinWidth),
        });
      return artItems;
    }
    else {
      for (let i = 0; i < arts.length; i++) {
        if (arts[i].slug !== "sin-categorizar") {
          artItems.push({
            databaseId: arts[i].databaseId,
            name: arts[i].name,
            slug: arts[i].slug,
            description: arts[i].description,
            image: getBestImageFromSrcSet(arts[i].image.srcSet, imageMinWidth),
          });
        }
      }
    }

    // Order items according to "databaseId" value
    artItems.sort((a, b) => a.databaseId - b.databaseId);

    return artItems;
  } catch (error) {
    console.error("Error loading gallery: ", error);
  }
};
