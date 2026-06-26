import Navbar from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <div
      className="
    max-w-6xl
    mx-auto
    p-6
   "
    >
      <Navbar />

      {children}
    </div>
  );
}

export default MainLayout;
