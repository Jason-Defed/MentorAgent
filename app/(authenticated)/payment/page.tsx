"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircleIcon, CheckCircleIcon, CreditCardIcon, WalletIcon } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const positionId = searchParams.get("position")
  const [paymentMethod, setPaymentMethod] = useState<"token" | "fiat">("token")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Mock position data based on ID
  const positionTitle =
    positionId === "1"
      ? "Software Engineer"
      : positionId === "2"
        ? "Data Scientist"
        : positionId === "3"
          ? "UX/UI Designer"
          : positionId === "4"
            ? "Product Manager"
            : positionId === "5"
              ? "Blockchain Developer"
              : "Selected Position"

  const handlePayment = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate success
      setSuccess(true)

      // Redirect after success
      setTimeout(() => {
        router.push("/resume-comparison")
      }, 2000)
    } catch (err) {
      setError("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (success) {
    return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-4">
              Thank you for your payment. You will be redirected to the next step shortly.
            </p>
            <div className="animate-pulse">
              <p className="text-sm text-gray-400">Redirecting...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Payment</CardTitle>
          <CardDescription className="text-center">
            Complete your payment to access detailed career guidance for {positionTitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="font-medium">Career Guidance Package</span>
                <span className="font-bold">50 EDU</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Includes personalized skill assessment, development plan, and mentor insights
              </p>
            </div>

            <Tabs defaultValue="token" onValueChange={(value) => setPaymentMethod(value as "token" | "fiat")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="token">
                  <WalletIcon className="h-4 w-4 mr-2" />
                  EDU Token
                </TabsTrigger>
                <TabsTrigger value="fiat">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Credit Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="token" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Wallet Balance</Label>
                  <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
                    <span>Available EDU</span>
                    <span className="font-bold">200 EDU</span>
                  </div>
                </div>

                <div className="p-3 border rounded-md bg-teal-50 text-teal-800 text-sm">
                  <p>You have sufficient tokens for this purchase.</p>
                </div>
              </TabsContent>

              <TabsContent value="fiat" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>

                <div className="p-3 border rounded-md bg-blue-50 text-blue-800 text-sm">
                  <p>Your card will be charged $25 USD (equivalent to 50 EDU).</p>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="flex items-center gap-2 p-3 text-sm border rounded-md border-red-200 bg-red-50 text-red-600">
                <AlertCircleIcon className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay ${paymentMethod === "token" ? "50 EDU" : "$25 USD"}`
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
