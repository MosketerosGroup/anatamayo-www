import Loader from "react-content-loader";

const ContentLoader = ({width = "100%", height = "100", viewBoxX = "100", viewBoxY = "100", transform = "", ...props}) => {
  
  const viewBox = `0 0 ${viewBoxX} ${viewBoxY}`;

  return (
  <Loader
    title="Loading..."
    speed={4}
    width={width}
    height={height}
    viewBox={viewBox}
    backgroundColor="#00000000"
    foregroundColor="#DEDEDE"
    backgroundOpacity={0}
    foregroundOpacity={0.25}
    gradientRatio={2}
    {...props}
  >
    <rect transform={transform} x="13" y="4" rx="0" ry="0" width={width} height={height} />
  </Loader>
)};

export default ContentLoader

