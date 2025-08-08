"use client";

import { authClient } from "@/lib/auth-client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.email("Digite um email válido"),
  password: z
    .string("Senha é obrigatória")
    .min(8, { message: "Senha é obrigatória" }),
});

export function SignInForm() {
  const router = useRouter();

  type FormValues = z.infer<typeof FormSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const { data, error } = await authClient.signIn.email({
      email: values.email, // required
      password: values.password, // required
      fetchOptions: {
        onSuccess: () => {
          toast.success("Usuário logado com sucesso!");
          // Redirecionar para a página inicial ou outra página após o login
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.message === "Invalid email or password") {
            toast.error("Usuário não encontrado");
            form.setError("email", {
              message: "E-mail ou senha inválidos",
            });
          }

          if (ctx.error.message === "Invalid email or password") {
            toast.error("Email ou senha inválidos");
            return form.setError("password", {
              message: "E-mail ou senha inválidos",
            });
          }
          toast.error("Erro ao fazer login, tente novamente mais tarde");
          console.log("Error on sign in:", ctx.error.message);
        },
      },
    });
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça o login para continuar</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit">Entrar</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
