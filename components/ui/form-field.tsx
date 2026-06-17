import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormField({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} {...register(name)} />
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
