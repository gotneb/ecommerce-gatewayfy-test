import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Conta criada com sucesso!
              </CardTitle>
              <CardDescription>Confirmar conta no seu email</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Você criou uma conta. Por favor cheque seu email para confirmar
                o seu email antes de fazer o login.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
