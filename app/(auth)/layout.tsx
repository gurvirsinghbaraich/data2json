type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="w-screen h-screen flex bg-stone-900 items-center justify-center">
      {children}
    </main>
  );
}
