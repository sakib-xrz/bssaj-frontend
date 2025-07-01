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
      <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl leading-tight text-primary mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-wrap pb-10">
          {description}
        </p>
      )}
    </div>
  );
}
