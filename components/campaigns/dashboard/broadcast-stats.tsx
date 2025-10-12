"use client"

interface BroadcastStatsProps {
  totalCalls: number
  processed: number
  remaining: number
  connected: number
  voicemail: number
  failed: number
  completionRate: number
}

export function BroadcastStats({
  totalCalls,
  processed,
  remaining,
  connected,
  voicemail,
  failed,
  completionRate,
}: BroadcastStatsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-blue-600 rounded" />
        <h3 className="text-lg font-semibold">Overall Broadcast Stats</h3>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <div className="text-3xl font-bold text-gray-900">{totalCalls}</div>
          <div className="text-sm text-gray-600 mt-1">Total Calls</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600">{processed}</div>
          <div className="text-sm text-gray-600 mt-1">Processed</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-orange-600">{remaining}</div>
          <div className="text-sm text-gray-600 mt-1">Remaining</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <div className="text-3xl font-bold text-green-600">{connected}</div>
          <div className="text-sm text-gray-600 mt-1">Connected</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-orange-600">{voicemail}</div>
          <div className="text-sm text-gray-600 mt-1">Voicemail</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-red-600">{failed}</div>
          <div className="text-sm text-gray-600 mt-1">Failed</div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${completionRate * 2.51} 251`}
              className="text-blue-600"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-blue-600">{completionRate}%</span>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900">Completion Rate</div>
          <div className="text-sm text-green-600 mt-1">0% above target</div>
        </div>
      </div>
    </div>
  )
}
