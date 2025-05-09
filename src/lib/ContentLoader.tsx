import Loader from "react-content-loader";

const ContentLoader = ({width = 100, height = 100, ...props}) => {
  
  const viewBox = `0 0 ${width} ${height}`;

  return (
  <Loader 
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
    <rect x="13" y="4" rx="20" ry="20" width={width} height={height} />
  </Loader>
)};

export default ContentLoader

