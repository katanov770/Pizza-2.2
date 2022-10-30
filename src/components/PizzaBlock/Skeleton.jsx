import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="127" cy="127" r="127" />
    <rect x="0" y="296" rx="0" ry="0" width="280" height="0" />
    <rect x="1" y="282" rx="10" ry="10" width="262" height="27" />
    <rect x="4" y="330" rx="10" ry="10" width="257" height="88" />
    <rect x="9" y="441" rx="10" ry="10" width="89" height="32" />
    <rect x="143" y="442" rx="25" ry="25" width="116" height="37" />
  </ContentLoader>
);

export default Skeleton;
