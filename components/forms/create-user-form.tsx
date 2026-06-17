"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/use-analytics";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export function CreateUserForm() {
  const methods = useForm({ 
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    }
  });
  
  const { mutateAsync: createUser } = useCreateUser();

  const onSubmit = async (data: any) => {
    try {
      await createUser(data);
      methods.reset();
      // You could also trigger a toast notification here
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="name" label="Full Name" />
        <FormField name="email" label="Email Address" type="email" />
        <Button type="submit" className="w-full bg-indigo-600" disabled={methods.formState.isSubmitting}>
          {methods.formState.isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </form>
    </FormProvider>
  );
}
