import FeedbackSheet from "@/components/ui/feedback";
import Nav from "@/components/ui/nav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html>
      <body>
        <Nav />
        <main className="h-screen w-screen flex flex-col items-center justify-center">
          {children}
          <FeedbackSheet />
        </main>
      </body>
    </html>
  );
}
