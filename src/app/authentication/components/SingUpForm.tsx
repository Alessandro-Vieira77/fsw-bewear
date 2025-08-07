"use client";

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

const FormSchema = z
  .object({
    name: z
      .string("Digite seu nome")
      .max(40, {
        message: "Somente 40 caracteres",
      })
      .trim()
      .min(1, "Nome é obrigatório"),
    email: z.email("Digite um email válido"),
    password: z.string().min(8, {
      message: "Digite no minímo 8 caracteres",
    }),
    passConfirm: z.string("Senha inválida").min(8, {
      message: "Digite no minímo 8 caracterces",
    }),
  })
  // para validar se as senhas são iguais
  .refine(
    (data) => {
      return data.password === data.passConfirm;
    },
    {
      error: "As senhas não coincidem",
      path: ["passConfirm"],
    },
  );

export function SignUpForm() {
  type FormValues = z.infer<typeof FormSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passConfirm: "",
    },
  });

  function onSubmit(values: FormValues) {
    console.log("Dados enviados com sucesso");
    console.log(values);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Cadastre-se para continuar </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
              {/* confirm */}
              <FormField
                control={form.control}
                name="passConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confrimar senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirma sua senha"
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
              <Button type="submit">Criar Conta</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
