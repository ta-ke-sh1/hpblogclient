import { useEffect, useRef } from "react";
import gsap from "gsap";
import $ from "jquery";

export default function FollowingEye(props) {
  const eye = useRef(null);
  const eye_2 = useRef(null);

  useEffect(() => {
    $(function () {
      $('#eye-move-area').on("mousemove", function (event) {
        const x = -(window.innerWidth / 2 - event.pageX) / 9;
        const y = -(window.innerHeight / 2 - event.pageY) / 9;

        const x2 = (x * 3) / 4;
        const y2 = (y * 3) / 4;

        gsap.to(eye.current, {
          duration: 0.5,
          transform: `translate(${x}px, ${y}px)`,
        });
        gsap.to(eye_2.current, {
          duration: 0.5,
          transform: `translate(${x2}px, ${y2}px)`,
        });
      });
    });
  }, []);

  return (
    <div className="eye-outer">
      <svg viewBox="0 0 617.24 351" height={props.height}>
        <path
          strokeWidth={0.05}
          class="cls-1"
          d="M308.62,2A354.69,354.69,0,0,1,487.35,50,361.88,361.88,0,0,1,614.9,175.5,361.88,361.88,0,0,1,487.35,301a355,355,0,0,1-84.69,35.48,356.94,356.94,0,0,1-94,12.56,357,357,0,0,1-94.05-12.56A354.73,354.73,0,0,1,129.89,301,362,362,0,0,1,2.33,175.5,362,362,0,0,1,129.89,50,354.61,354.61,0,0,1,308.62,2m0-2C177.71,0,63.11,70.32,0,175.5,63.11,280.68,177.71,351,308.62,351s245.51-70.32,308.62-175.5C554.13,70.32,439.53,0,308.62,0Z"
        />
        <path class="eye-circle-2" ref={eye_2} d="M308.62,64.67a110.84,110.84,0,1,1-78.37,32.46,110.08,110.08,0,0,1,78.37-32.46m0-2A112.83,112.83,0,1,0,421.45,175.5,112.83,112.83,0,0,0,308.62,62.67Z" />
        <circle class="eye-circle" cx="308.62" cy="175.5" r="42.58" ref={eye} />
      </svg>
    </div>
  );
}
