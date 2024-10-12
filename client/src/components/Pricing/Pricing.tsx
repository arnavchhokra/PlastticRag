import { Check, Minus, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const pricingPlans = [
  {
    name: "FREE",
    description:
      "Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.",
    price: "$0",
    buttonText: "Try it",
    buttonVariant: "outline",
    icon: <MoveRight className="w-4 h-4" />,
  },
  {
    name: "PRO",
    description:
      "Our goal is to streamline SMB trade, making it easier and faster than ever for everyone and everywhere.",
    price: "$10",
    buttonText: "Try it",
    buttonVariant: "default",
    icon: <MoveRight className="w-4 h-4" />,
  },
];

const features = [
  "SSO",
  "AI Assistant",
  "Version Control",
  "Members",
  "Multiplayer Mode",
  "Orchestration",
];

const featureAvailability = [
  [1, 1, 0, 0, 0, 0], // Startup
  [1, 1, 1, 1, 1, 1], // Growth
];

export const Pricing = () => (
  <div className="container mx-auto w-full py-10 lg:py-40">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Pricing Plans Columns */}
      {pricingPlans.map((plan, planIndex) => (
        <div
          key={planIndex}
          className="flex flex-col gap-10 border p-6 rounded-lg shadow-sm"
        >
          {/* Plan Details */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-sm text-gray-600">{plan.description}</p>
            <h1 className="text-4xl font-bold">{plan.price}</h1>
          </div>

          {/* Plan Button */}
          {planIndex % 2 === 0 ? (
            <Button variant="outline">{plan.buttonText}</Button>
          ) : (
            <Button variant="default">{plan.buttonText}</Button>
          )}

          {/* Feature Availability */}
          <div className="flex flex-col gap-2">
            {featureAvailability[planIndex].map(
              (availability, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2">
                  {availability === 1 ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{features[featureIndex]}</span>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
