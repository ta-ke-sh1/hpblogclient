export const BothWays = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" id="svg-cursor-icon" height={100} width={100} viewBox="0 0 63.68 100.09">
      <g id="Layer_2" dataName="Layer 2">
        <g id="Layer_1-2" dataName="Layer 1">
          <polygon points="33.49 93.71 33.53 6.38 61.33 34.18 63.68 31.82 31.86 0 0.04 31.82 2.4 34.18 30.2 6.38 30.16 93.71 2.36 65.91 0 68.27 31.82 100.09 63.64 68.27 61.28 65.91 33.49 93.71" />
        </g>
      </g>
    </svg>
  );
};

export const CanDragIcon = () => {
  return (
    <svg height={100} width={100} id="svg-can-drag" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" style={{ transform: "scale(1.4)", strokeWidth: "1.5px" }}>
      <line x1="32" y1="8" x2="32" y2="56" />
      <line x1="56" y1="32" x2="8" y2="32" />
      <polyline points="40 16 32 8 24 16" />
      <polyline points="24 48 32 56 40 48" />
      <polyline points="48 40 56 32 48 24" />
      <polyline points="16 24 8 32 16 40" />
    </svg>
  );
};

export const AccessIcon = () => {
  return (
    <svg height={100} width={100} id="svg-access" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scale(1.4)", strokeWidth: "0.6px" }} fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="miter">
      <polyline points="17 14 17 7 10 7"></polyline>
      <line x1="7" y1="17" x2="17" y2="7"></line>
    </svg>
  )
}
