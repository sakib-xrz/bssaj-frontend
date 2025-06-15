import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
}
