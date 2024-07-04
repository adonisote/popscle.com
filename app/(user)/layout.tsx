import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import FeedbackSheet from '@/components/ui/feedback';
import MobileNav from '@/components/mobileNavigation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <html>
      <body>
        <main className='h-screen w-screen flex flex-col items-center justify-center'>
          {children}
          <FeedbackSheet />
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
