import { MySuggestions, MyInformation } from "@/components/dashboard-comp"

export default function DashboardPage() {
  return (
      <div className="flex w-full justify-stretch gap-5">
        <MySuggestions whereIsThisUsed="home" />
        <MyInformation />
      </div>
  )
}
