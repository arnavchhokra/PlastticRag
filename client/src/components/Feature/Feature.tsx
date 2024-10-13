import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Feature = () => (
  <div id="feature" className="px-5 w-full py-20 lg:py-40">
    <div className="container mx-auto w-full">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 flex-col items-start">
          <div>
            <Badge>Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              Something new!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
              Because being smart is already tough!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">AI-Powered Look Analysis</h3>
              <p className="text-muted-foreground max-w-xs text-base">
              Get a personalized evaluation of your appearance using advanced AI that identifies areas for enhancement.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-md  aspect-square p-6 flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Detailed Improvement Suggestions</h3>
              <p className="text-muted-foreground max-w-xs text-base">
              Receive specific recommendations on skincare, grooming, or style adjustments to refine your overall look.
              </p>
            </div>
          </div>

          <div className="bg-muted rounded-md aspect-square p-6 flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Custom Style Guide</h3>
              <p className="text-muted-foreground max-w-xs text-base">
              Tailored fashion advice based on your facial features and body type to help elevate your personal style.
              </p>
            </div>
          </div>
          <div className="bg-muted rounded-md h-full lg:col-span-2 p-6 aspect-square lg:aspect-auto flex justify-between flex-col">
            <User className="w-8 h-8 stroke-1" />
            <div className="flex flex-col">
              <h3 className="text-xl tracking-tight">Before-and-After Comparison</h3>
              <p className="text-muted-foreground max-w-xs text-base">
              Upload images over time to track your progress and see how suggested improvements enhance your appearance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);