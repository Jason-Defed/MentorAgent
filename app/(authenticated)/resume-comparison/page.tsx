"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon, XCircleIcon, HelpCircleIcon, BookOpenIcon, TestTubeIcon, RocketIcon } from "lucide-react"

// Mock data for skills
const currentSkills = [
  { name: "JavaScript", level: "Intermediate", status: "verified" },
  { name: "HTML/CSS", level: "Advanced", status: "verified" },
  { name: "React", level: "Beginner", status: "verified" },
  { name: "Git", level: "Intermediate", status: "verified" },
]

const requiredSkills = [
  { name: "JavaScript", level: "Advanced", status: "gap" },
  { name: "React", level: "Intermediate", status: "gap" },
  { name: "Node.js", level: "Intermediate", status: "missing" },
  { name: "SQL", level: "Beginner", status: "missing" },
  { name: "Git", level: "Intermediate", status: "match" },
  { name: "HTML/CSS", level: "Advanced", status: "match" },
]

export default function ResumeComparisonPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "match":
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case "gap":
        return <HelpCircleIcon className="h-4 w-4 text-yellow-600" />
      case "missing":
        return <XCircleIcon className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "match":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Match</Badge>
      case "gap":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Improvement Needed</Badge>
      case "missing":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-8 md:py-12 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Resume Comparison & Enhancement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Current Skills</CardTitle>
              <CardDescription>Skills you currently have on your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-gray-500">{skill.level}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50">
                      Verified
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Required Skills for Software Engineer</CardTitle>
              <CardDescription>Compare your current skills with what's required</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requiredSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(skill.status)}
                      <div>
                        <p className="font-medium">{skill.name}</p>
                        <p className="text-sm text-gray-500">Required: {skill.level}</p>
                      </div>
                    </div>
                    {getStatusBadge(skill.status)}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Match</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="confirm">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Skill Confirmation</span>
                  <span className="sm:hidden">Confirm</span>
                </TabsTrigger>
                <TabsTrigger value="test">
                  <TestTubeIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Skill Testing</span>
                  <span className="sm:hidden">Test</span>
                </TabsTrigger>
                <TabsTrigger value="plan">
                  <RocketIcon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Development Plan</span>
                  <span className="sm:hidden">Plan</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="confirm" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Manual Skill Confirmation</CardTitle>
                    <CardDescription>Claim skills you already have that aren't on your resume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Do you have experience with Node.js?</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Node.js is required for the Software Engineer position at an Intermediate level.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline">Yes, I have this skill</Button>
                          <Button variant="outline">No, I need to learn</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h3 className="font-medium mb-2">Do you have experience with SQL?</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          SQL is required for the Software Engineer position at a Beginner level.
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline">Yes, I have this skill</Button>
                          <Button variant="outline">No, I need to learn</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="test" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Skill Testing</CardTitle>
                    <CardDescription>Verify your skill levels through AI-driven assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">JavaScript Assessment</h3>
                          <Badge>20 minutes</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Test your JavaScript knowledge to verify your current level and identify areas for
                          improvement.
                        </p>
                        <Button>Start Assessment</Button>
                      </div>

                      <div className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">React Assessment</h3>
                          <Badge>25 minutes</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">
                          Evaluate your React skills through practical coding challenges and knowledge questions.
                        </p>
                        <Button>Start Assessment</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="plan" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Plan</CardTitle>
                    <CardDescription>Your personalized roadmap to acquire missing skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">1. Improve JavaScript Skills</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Advance from Intermediate to Advanced level (4-6 weeks)
                        </p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Advanced JavaScript Course</p>
                                <p className="text-xs text-gray-500">
                                  Online course covering closures, prototypes, and async patterns
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">JavaScript Coding Challenges</p>
                                <p className="text-xs text-gray-500">Complete 20 advanced algorithm challenges</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">2. Learn Node.js</h3>
                        <p className="text-sm text-gray-500 mb-2">Achieve Intermediate level (8 weeks)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Node.js Fundamentals</p>
                                <p className="text-xs text-gray-500">
                                  Learn core concepts and build simple applications
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Build a REST API with Express</p>
                                <p className="text-xs text-gray-500">
                                  Create a complete backend application with database integration
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">3. Learn SQL Basics</h3>
                        <p className="text-sm text-gray-500 mb-2">Achieve Beginner level (4 weeks)</p>
                        <div className="space-y-2">
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">SQL Fundamentals Course</p>
                                <p className="text-xs text-gray-500">
                                  Learn basic queries, database design, and CRUD operations
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3 border rounded-md bg-gray-50">
                            <div className="flex items-start gap-2">
                              <div className="mt-0.5">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-teal-600"
                                >
                                  <path d="M12 9h.01"></path>
                                  <path d="M11 12h1v4h1"></path>
                                  <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                              </div>
                              <div>
                                <p className="font-medium text-sm">Database Project</p>
                                <p className="text-xs text-gray-500">
                                  Build a simple database application to practice your skills
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Start Your Development Plan</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
