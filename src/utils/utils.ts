export const getBestImageFromSrcSet = (flatSrcSet: string, minSize: number) => {

    // Turn srcSet string into an array containing both link and size of each image
  const srcSet = flatSrcSet.split(",");

  // Iterate each (link + size) string, and push "size" value into an array
  const srcSetSizes: Array<string> = [];
  srcSet.map((set) => {
    srcSetSizes.push(set.trim().split(" ")[1].slice(0, -1));
  });

  // Calculate how close is each size to IMAGE_MIN_WIDTH
  const closeness : Array<number> = [];
  srcSetSizes.map((size) => {
    closeness.push(Number(size) - minSize);
  });

  // Eliminate negative closeness and order from loweest to highest valvue
  const filteredCloseness = closeness.filter((close) => (close > 0));
  filteredCloseness.sort((a, b) => (a - b));

  // Get best image from srcSet
  const bestIndex = closeness.indexOf(filteredCloseness[0]);

  const returnValue = srcSet[bestIndex].trim().split(' ')[0];

  return returnValue;
}


export const getHigherImageFromSrcSet = (flatSrcSet: string) => {

  // Turn srcSet string into an array containing both link and size of each image
  const srcSet = flatSrcSet.split(",");

  // The highest position in this array is always the biggest image
  const bestImage = srcSet[srcSet.length-1].split(" ")[1];

  return bestImage;
}
