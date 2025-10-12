export interface Campaign {
  id: string
  title: string
  totalRecipients: number
  simultaneousCalls: number
  destination: string
  timeRange: {
    start: string
    end: string
  }
  status: "Ongoing" | "Completed" | "Scheduled" | "Paused"
  createdAt: string
}

export interface CampaignCustomer {
  id: string
  name: string
  phoneNumber: string
  status: "Pending" | "Called" | "Connected" | "Failed" | "Voicemail"
  createdAt: string
}

export interface CampaignStats {
  totalCalls: number
  processed: number
  remaining: number
  connected: number
  voicemail: number
  failed: number
  completionRate: number
  totalResponses: number
  responseRate: number
}
