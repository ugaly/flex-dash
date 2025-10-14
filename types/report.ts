export type SummaryReportType =
  | "contact-center-performance"
  | "agent-performance"
  | "ivr-report"
  | "customer-end-to-ivr"
  | "outgoing-calls"
  | "recording-report"
  | "yearly-contact-center-performance"
  | "agent-state-log-report"
  | "agent-outgoing-call-report"

export type LogsReportType = "all-logs" | "logs-by-agent"

export type FormatType = "preview" | "excel"

export interface SummaryReportConfig {
  showTargetField: boolean
  targetFieldLabel: "Target Queue" | "Target IVR" | "Agent"
  showRecordingName: boolean
}

export interface ReportFormData {
  reportType: string
  targetQueue?: string
  targetIVR?: string
  agent?: string
  recordingName?: string
  dateRange: string
  format: FormatType
}

export interface LogsReportFormData {
  reportType: LogsReportType
  queue: string
  agentExtension?: string
  desposition: string
  dateRange: string
}
