import { useState } from "react";
import Brazil from "@react-map/brazil";
import { fetchPopulacaoEstados } from "@/services/ibge";
import { Card, CardContent } from "@/components/ui/card";

type SiglaUF = keyof typeof SIGLA_PARA_CODIGO;

export const NOME_PARA_SIGLA: Record<string, SiglaUF> = {
  Acre: "AC",
  Alagoas: "AL",
  Amapá: "AP",
  Amazonas: "AM",
  Bahia: "BA",
  Ceará: "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  Goiás: "GO",
  Maranhão: "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  Pará: "PA",
  Paraíba: "PB",
  Paraná: "PR",
  Pernambuco: "PE",
  Piauí: "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  Rondônia: "RO",
  Roraima: "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  Sergipe: "SE",
  Tocantins: "TO",
};

const SIGLA_PARA_CAPITAL = {
  AC: "Rio Branco",
  AL: "Maceió",
  AP: "Macapá",
  AM: "Manaus",
  BA: "Salvador",
  CE: "Fortaleza",
  DF: "Brasília",
  ES: "Vitória",
  GO: "Goiânia",
  MA: "São Luís",
  MT: "Cuiabá",
  MS: "Campo Grande",
  MG: "Belo Horizonte",
  PA: "Belém",
  PB: "João Pessoa",
  PR: "Curitiba",
  PE: "Recife",
  PI: "Teresina",
  RJ: "Rio de Janeiro",
  RN: "Natal",
  RS: "Porto Alegre",
  RO: "Porto Velho",
  RR: "Boa Vista",
  SC: "Florianópolis",
  SP: "São Paulo",
  SE: "Aracaju",
  TO: "Palmas",
} as const;

export const SIGLA_PARA_CODIGO = {
  AC: 12,
  AL: 27,
  AP: 16,
  AM: 13,
  BA: 29,
  CE: 23,
  DF: 53,
  ES: 32,
  GO: 52,
  MA: 21,
  MT: 51,
  MS: 50,
  MG: 31,
  PA: 15,
  PB: 25,
  PR: 41,
  PE: 26,
  PI: 22,
  RJ: 33,
  RN: 24,
  RS: 43,
  RO: 11,
  RR: 14,
  SC: 42,
  SP: 35,
  SE: 28,
  TO: 17,
} as const;

export function Maps() {
  const [nomeUF, setNomeUF] = useState<string | null>(null);
  const [populacao, setPopulacao] = useState<number | null>(null);
  const [siglaUF, setSiglaUF] = useState<SiglaUF | null>(null);

  async function handleSelect(nome: string | null) {
    if (!nome) return;

    setNomeUF(nome);

    const sigla = NOME_PARA_SIGLA[nome] as SiglaUF;

    setSiglaUF(sigla);

    const [dadosPop] = await Promise.all([
      fetchPopulacaoEstados([SIGLA_PARA_CODIGO[sigla]]),
    ]);

    setPopulacao(
      dadosPop.length ? Number(dadosPop[dadosPop.length - 1].populacao) : null,
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <Card className="m-4 border-0 w-fit">
          <CardContent className="grid justify-center">
            <h1 className="text-center text-2xl font-bold mb-2">
              Mapa do Brasil
            </h1>
            <Brazil
              type="select-single"
              hoverColor={"#1E40AF"}
              selectColor={"#60A5FA"}
              strokeWidth={1}
              onSelect={handleSelect}
            />
          </CardContent>
        </Card>
        <Card className="m-4 border-0 w-[200px] h-fit">
          <CardContent>
            <div className="space-y-2 text-sm">
              <h1 className="font-bold mb-2">Detalhes</h1>
              <p>
                <strong>UF:</strong> {nomeUF ? nomeUF : "-"}
              </p>
              <p>
                <strong>Sigla:</strong> {siglaUF ? siglaUF : "-"}
              </p>

              <p>
                <strong>Capital:</strong>{" "}
                {siglaUF ? SIGLA_PARA_CAPITAL[siglaUF] : "-"}
              </p>
              <p>
                <strong>População:</strong>{" "}
                {populacao ? populacao.toLocaleString("pt-BR") : "-"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
