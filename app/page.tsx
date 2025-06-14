import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <p className="text-sm text-muted-foreground">This is a test paragraph</p>

      <div className="flex gap-4 mt-4">
        <Button>Click me</Button>
        <Button variant="secondary">Click me</Button>
        <Button variant="outline">Click me</Button>
        <Button variant="destructive">Click me</Button>
        <Button variant="ghost">Click me</Button>
        <Button variant="link">Click me</Button>
      </div>
    </div>
  );
}
