import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import type { ChartData } from "chart.js";
import type { PopulacaoEstado } from "../../services/ibge";

type Props = {
  data: PopulacaoEstado[];
};

export function PopulationChart({ data }: Props) {
  const chartData = useMemo<ChartData<"line">>(() => {
    // 🔹 anos únicos (labels)
    const labels = Array.from(new Set(data.map((item) => item.ano))).sort();

    // 🔹 agrupa por estado
    const grouped = data.reduce<Record<string, PopulacaoEstado[]>>(
      (acc, item) => {
        acc[item.estado] = acc[item.estado] || [];
        acc[item.estado].push(item);
        return acc;
      },
      {},
    );

    const states = Object.keys(grouped);
    const colors = generateColors(states.length);

    // 🔹 monta datasets automaticamente
    const datasets = states.map((estado, index) => ({
      label: estado,
      data: labels.map(
        (ano) => grouped[estado].find((v) => v.ano === ano)?.populacao ?? 0,
      ),
      borderColor: colors[index],
      tension: 0.4,
    }));

    return { labels, datasets };
  }, [data]);

  return <Line data={chartData} />;
}

// 🔹 helper fora do componente (ok)
function generateColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((360 / count) * i);
    return `hsl(${hue}, 65%, 55%)`;
  });
}
