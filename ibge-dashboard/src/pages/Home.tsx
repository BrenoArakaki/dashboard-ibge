import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getPaises } from "../services/ibge";
import type { paisesIBGE } from "../services/ibge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function Home() {
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  const {
    data: paises,
    isLoading,
    isError,
    error,
  } = useQuery<paisesIBGE[]>({
    queryKey: ["paises"],
    queryFn: getPaises,
  });

  const paisesFiltrados = useMemo(() => {
    if (!search) return paises;

    return paises?.filter((pais) =>
      pais.nome.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, paises]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.ceil((paisesFiltrados?.length ?? 0) / ITEMS_PER_PAGE);

  const paisesPaginados = useMemo(() => {
    if (!paisesFiltrados) return [];

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return paisesFiltrados.slice(start, end);
  }, [paisesFiltrados, page]);

  if (isLoading) {
    return <p>Carregando estados...</p>;
  }

  if (isError) {
    return <p>Erro: {(error as Error).message}</p>;
  }

  return (
    <Card className="m-4 border-0">
      <CardContent>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar país..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-auto rounded-xl shadow-sm">
          <Table className="[&_tr]:border-0 [&_th]:border-0 [&_td]:border-0">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[35%] font-semibold">País</TableHead>

                <TableHead className="w-[15%] text-center">Sigla</TableHead>

                <TableHead className="w-[25%] font-semibold">
                  Continente
                </TableHead>

                <TableHead className="w-[25%] font-semibold">
                  Sub-região
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paisesPaginados?.map((pais) => (
                <TableRow
                  key={pais.id.M49}
                  className="
    odd:bg-[hsl(var(--card))]
    even:bg-[hsl(var(--muted)/0.25)]
    hover:bg-[hsl(var(--muted)/0.4)]
    transition-colors
  "
                >
                  <TableCell className="font-medium">{pais.nome}</TableCell>

                  <TableCell className="text-center font-mono text-sm">
                    {pais.id["ISO-ALPHA-2"]}
                  </TableCell>

                  <TableCell className="">
                    {pais["sub-regiao"].regiao.nome}
                  </TableCell>

                  <TableCell className="">{pais["sub-regiao"].nome}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4 gap-4">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">
            Página {page} de {totalPages || 1}
          </span>

          <div className="flex gap-2">
            <Button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              variant="outline"
            >
              Anterior
            </Button>

            <Button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages || totalPages === 0}
              variant="outline"
            >
              Próximo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Home;
