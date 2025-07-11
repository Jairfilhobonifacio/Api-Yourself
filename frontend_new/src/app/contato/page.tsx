'use client';

import Link from "next/link";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContatoPage() {
  return (
    <main className="container max-w-3xl py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Fale Conosco</h1>
        <p className="text-muted-foreground text-lg">
          Entre em contato com a equipe da ApiYourself. Teremos prazer em ajudar!
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Informações de Contato</h2>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <a
              href="mailto:contato@apiyourself.org"
              className="hover:underline text-muted-foreground"
            >
              contato@apiyourself.org
            </a>
          </li>
          <li className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <a
              href="tel:+5511999999999"
              className="hover:underline text-muted-foreground"
            >
              +55 11 99999-9999
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Redes Sociais</h2>
        <p className="text-muted-foreground">
          Siga-nos nas redes sociais para acompanhar novidades e campanhas:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            <a href="https://instagram.com/apiyourself" target="_blank" rel="noreferrer" className="hover:underline">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://twitter.com/apiyourself" target="_blank" rel="noreferrer" className="hover:underline">
              Twitter / X
            </a>
          </li>
          <li>
            <a href="https://linkedin.com/company/apiyourself" target="_blank" rel="noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </li>
        </ul>
      </section>

      <Button variant="outline" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a Home
        </Link>
      </Button>
    </main>
  );
}
