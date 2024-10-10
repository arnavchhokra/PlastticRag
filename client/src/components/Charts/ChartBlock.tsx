"use client"

import { useState } from "react"
import { Bar, BarChart, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Eye, Smile, Scissors, Sparkles } from "lucide-react"
import RadChart from "./RadChart"
// Mock data
const facialComparisonData = [
  { feature: "Eyes", userScore: 85, averageScore: 70 },
  { feature: "Nose", userScore: 75, averageScore: 72 },
  { feature: "Lips", userScore: 90, averageScore: 68 },
  { feature: "Jawline", userScore: 82, averageScore: 65 },
  { feature: "Cheekbones", userScore: 88, averageScore: 70 },
  { feature: "Forehead", userScore: 78, averageScore: 75 },
]

// const goodLooksPercentileData = [
//   { category: "10%", percentile: 10 },
//   { category: "25%", percentile: 25 },
//   { category: "50%", percentile: 50 },
//   { category: "75%", percentile: 75 },
//   { category: "90%", percentile: 90 },
//   { category: "You", percentile: 85 },
// ]

const bestFacialFeaturesData = [
  { name: "eyes", value: 30 },
  { name: "lips", value: 25 },
  { name: "cheekbones", value: 20 },
  { name: "jawline", value: 15 },
  { name: "nose", value: 10 },
]

const improvementTips = [
  "Enhance your eye area with proper skincare and makeup techniques",
  "Consider a new hairstyle that complements your face shape",
  "Practice facial exercises to improve muscle tone and definition",
  "Experiment with different eyebrow shapes to frame your face better",
  "Use contouring techniques to accentuate your best features",
]

const surgicalTips = [
  "Consider a brow lift to improve the appearance of your forehead",
  "Explore a facelift to address sagging skin and wrinkles",
  "Consider a rhinoplasty to refine your nose shape",
  "Think about a chin augmentation to enhance your jawline",
  "Consider a cheek augmentation to enhance your cheekbones",
]

export default function ChartBlock() {
  const [currentImprovementTip, setCurrentImprovementTip] = useState(0)
  const [currentSurgicalTip, setCurrentSurgicalTip] = useState(0)

  const nextImprovementTip = () => {
    setCurrentImprovementTip((prev) => (prev + 1) % improvementTips.length)
  }

  const nextSurgicalTip = () => {
    setCurrentSurgicalTip((prev) => (prev + 1) % surgicalTips.length)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Title</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="md:col-span-2 lg:col-span-3">
      <CardHeader>
            <CardTitle>SKILL GRAPH</CardTitle>
            <CardDescription>Your facial features represented in a skill graph.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadChart/>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 overflow-clip">
          <CardHeader>
            <CardTitle>Facial Features Comparison</CardTitle>
            <CardDescription>Your features compared to the general population</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center ">
            <ChartContainer
              config={{
                userScore: {
                  label: "Your Score",
                  color: "hsl(var(--chart-1))",
                },
                averageScore: {
                  label: "Average Score",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={facialComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="feature" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="userScore" fill="var(--color-userScore)" />
                  <Bar dataKey="averageScore" fill="var(--color-averageScore)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>


        <Card className = "overflow-clip">
          <CardHeader>
            <CardTitle>Best Facial Features</CardTitle>
            <CardDescription>Distribution of your strongest attributes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center ">
            <ChartContainer
              config={{
                eyes: {
                  label: "Eyes",
                  color: "hsl(var(--chart-1))",
                },
                lips: {
                  label: "Lips",
                  color: "hsl(var(--chart-2))",
                },
                cheekbones: {
                  label: "Cheekbones",
                  color: "hsl(var(--chart-3))",
                },
                jawline: {
                  label: "Jawline",
                  color: "hsl(var(--chart-4))",
                },
                nose: {
                  label: "Nose",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bestFacialFeaturesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {bestFacialFeaturesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Surgical Tips</CardTitle>
            <CardDescription>Suggestions to enhance your facial features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-lg font-medium">{surgicalTips[currentSurgicalTip]}</p>
              </div>
              <Button onClick={nextSurgicalTip} variant="outline" size="icon">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Improvement Tips</CardTitle>
            <CardDescription>Suggestions to enhance your facial features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-lg font-medium">{improvementTips[currentImprovementTip]}</p>
              </div>
              <Button onClick={nextImprovementTip} variant="outline" size="icon">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>Important observations from your facial analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-4">
                <Eye className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Best Feature</p>
                  <p className="text-2xl font-bold">Eyes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Smile className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Smile Impact</p>
                  <p className="text-2xl font-bold">High</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Scissors className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Styling Potential</p>
                  <p className="text-2xl font-bold">Very High</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Sparkles className="h-10 w-10 text-primary" />
                <div>
                  <p className="text-sm font-medium">Overall Rating</p>
                  <p className="text-2xl font-bold">8.5/10</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}