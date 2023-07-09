import moment from "moment";
import jwt_decode from "jwt-decode";
import { gsap } from "gsap";

export const host_url = "http://localhost:5000";

export const image_path = host_url + "/images";

export const fromMilisecondsToFormattedDate = (milisecondsSinceEpoch) => {
  return moment(milisecondsSinceEpoch * 1000).format("YYYY-M-D");
};

export const convertSecondsToTime = (input) => {
  var seconds = input;
  var days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  var hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  var mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  return {
    days: days,
    hours: hrs,
    minutes: mnts,
    seconds: seconds,
  };
};

export const fromMilisecondsToDate = (milisecondsSinceEpoch) => {
  const date = new Date(milisecondsSinceEpoch * 1000);
  return date.toUTCString();
};

export function convertStringToArray(input) {
  if (input.startsWith("[")) {
    input = input.substring(1, input.length);
  }
  if (input.endsWith("]")) {
    input = input.substring(0, input.length - 1);
  }
  return input.split(",");
}

export function isExpired(secondsSinceEpoch) {
  return secondsSinceEpoch < Date.now() / 1000;
}

export function isExpiredToken(secondsSinceEpoch) {
  return secondsSinceEpoch < Date.now() / 1000;
}

export function convertDateToDayOfTheWeek(date) {
  var day = moment(date, "DD MMM YYYY");
  return day.format("ddd");
}

export function convertDateToDisplayFormat(date) {
  var day = moment(date);
  return day.format("MMM DD, YYYY");
}

export function getCurrentDateAsDBFormat() {
  return moment().format("YYYY/M/D");
}

export function decodeToken(token) {
  return jwt_decode(token.substring(7, token.length));
}

export const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  }
  return "desktop";
};

export const textShuffle = (sourceElement, content, interval, duration) => {
  let iteration = 0;
  const letters = "0123456789abcdefghijklmnoupqrstuvxyz!#$%^&*()_+-=<>?/";
  clearInterval(interval);

  interval = setInterval(() => {
    sourceElement.innerText = content
      .split("")
      .map((letter, i) => {
        if (i < iteration) {
          if (!"!#$%^&*()_+-=<>?/".split("").includes(content[i])) {
            return content[i].toLowerCase();
          }
          return content[i];
        }

        return letters[Math.floor(Math.random() * 54)];
      })
      .join("");

    if (iteration >= content.length) {
      clearInterval(interval);
    }

    iteration += 1;
  }, duration);
};

export function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const cursorNormal = (outer, text) => {
  gsap.to(outer, {
    scale: 1,
    duration: 0.4,
    ease: "power",
  });
  gsap.to(text, {
    opacity: 0,
    duration: 0.2,
    ease: "none",
  });
};

export const cursorMagnify = (outer, text) => {
  gsap.to(outer, {
    scale: 4,
    duration: 0.4,
    ease: "power",
  });
  gsap.to(text, {
    opacity: 1,
    duration: 0.2,
    ease: "none",
  });
};

export const cursorNormal2 = (outer, text) => {
  gsap.to(outer, {
    scale: 1,
    duration: 0.4,
    ease: "power",
  });
  gsap.to(text, {
    opacity: 0,
    duration: 0.2,
    ease: "none",
  });
};

export const cursorMagnify2 = (outer, text) => {
  gsap.to(outer, {
    scale: 4,
    duration: 0.4,
    ease: "power",
  });
  gsap.to(text, {
    opacity: 1,
    duration: 0.2,
    ease: "none",
  });
};

export const hightlightSpanOver = (element) => {
  gsap.to(element, {
    color: "#f53c62",
    duration: 0.1,
    ease: "power"
  })
}

export const removeHighlighSpanOver = (element) => {
  gsap.to(element, {
    color: "black",
    duration: 0.1,
    ease: "power"
  })
}

export const dragIconOnMouseDown = () => {
  console.log("Down");
  let arrow = document.getElementById('svg-cursor-icon')
  let dragIcon = document.getElementById('svg-can-drag')
  gsap.to(arrow, {
    opacity: 0,
    duration: 0.2
  })
  gsap.to(dragIcon, {
    opacity: 1,
    duration: 0.2
  })
};

export const dragIconOnMouseUp = () => {
  console.log("Up");
  let arrow = document.getElementById('svg-cursor-icon')
  let dragIcon = document.getElementById('svg-can-drag')
  gsap.to(arrow, {
    opacity: 1,
    duration: 0.2
  })
  gsap.to(dragIcon, {
    opacity: 0,
    duration: 0.2
  })
};
