"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const FeaturesSection = () => {
  const features = [
    {
      title: "Diet Tracking",
      description:
        "Track meals, calories, macros, and hydration for a complete view of your diet.",
      href: "/meal",
    },
    {
      title: "Workout Logging",
      description:
        "Track workouts like weightlifting, running, or yoga with sets, reps, duration, and intensity.",
      href: "/workouts",
    },
    {
      title: "Goal Setting",
      description:
        "Set and monitor fitness goals such as weight loss or muscle gain.",
      href: "/goals",
    },
    {
      title: "Progress Analytics",
      description:
        "Visualize your progress with charts on weight, calories burned, and distance.",
      href: "/analytics",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-4">App Features</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <Link
            href={feature.title === "Diet Tracking" ? feature.href : ""}
            key={i}
          >
            <Card
              key={i}
              className={`cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full ${
                feature.title !== "Diet Tracking"
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <p className="text-muted-red">{feature.description}</p>
              </CardContent>
              <Button
                className={`${
                  feature.title === "Diet Tracking" ? "bg-cyan-700" : ""
                }`}
                disabled={feature.title !== "Diet Tracking"}
              >
                Try It
              </Button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
