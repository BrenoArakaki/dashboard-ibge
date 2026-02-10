import {
  fetchPopulacaoEstados,
  UF_MAPPER,
  type PopulacaoEstado,
  type UFCodigo,
} from "@/services/ibge";
import { PopulationChart } from "../components/ui/population";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { MultiSelect } from "@/components/ui/multiselect";

function Dashboard() {
  const [data, setData] = useState<PopulacaoEstado[]>([]);
  const [ufs, setUfs] = useState<string[]>(["11", "12"]);

  const ufOptions = Object.values(UF_MAPPER).map((uf) => ({
    label: uf.nome,
    value: String(uf.codigo),
  }));

  useEffect(() => {
    const ufsCodigo: UFCodigo[] = ufs
      .map(Number)
      .filter((uf): uf is UFCodigo => uf in UF_MAPPER);

    console.log(ufsCodigo);
    fetchPopulacaoEstados(ufsCodigo).then(setData);
  }, [ufs]);

  return (
    <Card className="m-4 border-0">
      <CardContent>
        <MultiSelect
          options={ufOptions}
          value={ufs}
          onChange={setUfs}
          placeholder="Selecione os estados"
        />

        <div className="w-full">
          <h1 className="text-center font-bold text-xl mb-1">
            População por Estado
          </h1>
          <PopulationChart data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
export default Dashboard;
