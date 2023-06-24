import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function StoryCard(props) {
  const storyCard = useRef(null);

  useEffect(() => {
    gsap.to(storyCard.current, {
      left: props.pos.x,
      top: props.pos.y,
      duration: 0,
    });
  });

  const handleClose = () => {
    gsap.to(storyCard.current, {
      opacity: 0,
      pointerEvents: "none",
      duration: 0,
    });
  };

  return (
    <div className={"story-card " + props.className} ref={storyCard} style={{ width: props.width + "vw" }}>
      <div className="control">
        <div className="story-title">{props.title}.txt</div>
        <button onClick={() => handleClose()}>
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 71.21 71.21">
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <polygon class="cls-1" points="71.21 8.9 62.31 0 35.61 26.7 8.9 0 0 8.9 26.7 35.61 0 62.31 8.9 71.21 35.61 44.51 62.31 71.21 71.21 62.31 44.51 35.61 71.21 8.9" />
              </g>
            </g>
          </svg>
        </button>
      </div>
      <div className="content" style={{ maxHeight: props.height + "vh" }}>
        {props.children}
      </div>
    </div>
  );
}
