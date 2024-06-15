export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html>
      <body>
        <main className="h-screen w-screen flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
