"use client"

import { useDashboard } from "./useDashboard"
import { DashboardView } from "./DashboardView"

export default function Page() {
  const state = useDashboard()

  return <DashboardView {...state} />
}