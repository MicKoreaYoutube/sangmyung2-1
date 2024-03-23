import { MySuggestions, MyInformation } from "@/components/dashboard-comp"

export default function DashboardPage() {
  return (
      <div className="flex w-full flex-col justify-stretch gap-5 md:flex-row">
        <MySuggestions whereIsThisUsed="home" />
        <MyInformation />
      </div>
  )
}
