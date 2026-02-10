export type paisesIBGE = {
  id: {
    M49: number;
    "ISO-ALPHA-2": string;
  };
  nome: string;

  "sub-regiao": {
  nome: string;
 regiao: {
  nome: string
}}};

export type PopulacaoEstado = {
  estado: string
  ano: number
  populacao: number
}

interface SidraRawItem {
  D1C: string // código UF
  D1N: string // nome UF
  D3N: string // ano
  V: string   // valor
}

export function buildSidraUFParam(ufs: UFCodigo[]): string {
  return ufs.join(",");
}

export const UF_MAPPER = {
  11: { codigo: 11, sigla: "RO", nome: "Rondônia" },
  12: { codigo: 12, sigla: "AC", nome: "Acre" },
  13: { codigo: 13, sigla: "AM", nome: "Amazonas" },
  14: { codigo: 14, sigla: "RR", nome: "Roraima" },
  15: { codigo: 15, sigla: "PA", nome: "Pará" },
  16: { codigo: 16, sigla: "AP", nome: "Amapá" },
  17: { codigo: 17, sigla: "TO", nome: "Tocantins" },
  21: { codigo: 21, sigla: "MA", nome: "Maranhão" },
  22: { codigo: 22, sigla: "PI", nome: "Piauí" },
  23: { codigo: 23, sigla: "CE", nome: "Ceará" },
  24: { codigo: 24, sigla: "RN", nome: "Rio Grande do Norte" },
  25: { codigo: 25, sigla: "PB", nome: "Paraíba" },
  26: { codigo: 26, sigla: "PE", nome: "Pernambuco" },
  27: { codigo: 27, sigla: "AL", nome: "Alagoas" },
  28: { codigo: 28, sigla: "SE", nome: "Sergipe" },
  29: { codigo: 29, sigla: "BA", nome: "Bahia" },
  31: { codigo: 31, sigla: "MG", nome: "Minas Gerais" },
  32: { codigo: 32, sigla: "ES", nome: "Espírito Santo" },
  33: { codigo: 33, sigla: "RJ", nome: "Rio de Janeiro" },
  35: { codigo: 35, sigla: "SP", nome: "São Paulo" },
  41: { codigo: 41, sigla: "PR", nome: "Paraná" },
  42: { codigo: 42, sigla: "SC", nome: "Santa Catarina" },
  43: { codigo: 43, sigla: "RS", nome: "Rio Grande do Sul" },
  50: { codigo: 50, sigla: "MS", nome: "Mato Grosso do Sul" },
  51: { codigo: 51, sigla: "MT", nome: "Mato Grosso" },
  52: { codigo: 52, sigla: "GO", nome: "Goiás" },
  53: { codigo: 53, sigla: "DF", nome: "Distrito Federal" },
} as const

export type UFCodigo = keyof typeof UF_MAPPER

export async function getPaises(): Promise<paisesIBGE[]> {
  const response = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/paises"
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar estados");
  }

  return response.json();
}

export async function fetchPopulacaoEstados(
  ufs: UFCodigo[],
): Promise<PopulacaoEstado[]> {

  const ufParam = buildSidraUFParam(ufs);
  
  const res = await fetch(
    `https://apisidra.ibge.gov.br/values/t/6579/n3/${ufParam}/v/9324/p/2001-2022`
  )

  if (!res.ok) throw new Error("Erro IBGE")

  const data: SidraRawItem[] = await res.json()

  return data
    .slice(1)
    .filter(item => item.V !== "...")
    .map(item => ({
      estado: item.D1N,
      ano: Number(item.D3N),
      populacao: Number(item.V),
    }))
}