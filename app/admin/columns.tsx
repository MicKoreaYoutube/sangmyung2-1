"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DocumentData } from "firebase/firestore"
import { db } from "@/firebase/initialization"

export interface userType {
  name: string
  role: "일반학생" | "자치부장" | "정보부장" | "회장" | "총관리자(회장)"
  applyToPromotion: "자치부장" | "정보부장" | "회장"
  banInfo: Array<{
    banStartTime: Date
    banEndTime: Date
  }>
}

export let userList: ColumnDef<DocumentData>[] = []