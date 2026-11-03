import React from "react";
interface Props {
  className?: string;
  /** White HELSTOMM + lime GROUP — for dark backgrounds. */ lightText?: boolean;
  /** Official lockup has no slogan; kept so existing callers still compile. */ compact?: boolean;
}
const SRC_LIGHT = "/brand/helstomm-group.png";
const SRC_DARK = "/brand/helstomm-group-on-dark.png";
export const HelstommLogo: React.FC<Props> = ({
  className = "h-10 w-auto",
  lightText = false,
}) => (
  <img
    src={lightText ? SRC_DARK : SRC_LIGHT}
    alt="HELSTOMM GROUP"
    className={`object-contain ${className}`}
    width={1800}
    height={382}
    decoding="async"
    draggable={false}
  />
);
