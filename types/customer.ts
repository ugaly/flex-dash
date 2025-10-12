export interface Customer {
  id: string
  name: string
  phoneNumber: string
  status: "Pending" | "Called" | "Failed" | "Completed"
  createdAt: string
}
