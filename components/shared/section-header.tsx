import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center space-y-2", className)}>
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight text-primary mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto pb-10 text-lg md:text-2xl tracking-wide">
          {description}
        </p>
      )}
    </div>
  );
}
