import { Check, ChevronsUpDown, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "./input";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Selecione...",
}: MultiSelectProps) {
  function toggle(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue],
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-[350px] justify-between"
        >
          {value.length ? `${value.length} selecionado(s)` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0">
        <Command className="bg-card text-foreground">
          {/* Topo */}
          <div className="relative py-2">
            <CommandInput
              placeholder="Buscar..."
              className="
 
    "
            />
            {value.length > 0 && (
              <Button
                variant="ghost"
                onClick={() => onChange([])}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X />
              </Button>
            )}
          </div>
          <CommandEmpty>Nenhum encontrado</CommandEmpty>

          {/* Lista */}
          <CommandGroup className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggle(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.includes(option.value) ? "opacity-100" : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
