import { geoMercator, geoPath } from "d3-geo";

type Props = {
  width?: number;
  height?: number;
};

export function MapaBrasil({ width = 800, height = 600 }: Props) {
  const projection = geoMercator()
    .scale(700)
    .center([-55, -15]) // centro do Brasil
    .translate([width / 2, height / 2]);

  const pathGenerator = geoPath(projection);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <path
        d={
          pathGenerator(
            // @ts-ignore
            require("@/data/brazil.geo.json"),
          ) || undefined
        }
        fill="#3B82F6"
        stroke="#1E3A8A"
        strokeWidth={1}
      />
    </svg>
  );
}
