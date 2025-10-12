"use client"

interface SystemPerformanceProps {
  avgMessageDuration: string
  callSuccessRate: number
  callDropRate: number
  callsPerSecond: number
  avgAnswerTime: string
  activeChannels: string
}

export function SystemPerformance({
  avgMessageDuration,
  callSuccessRate,
  callDropRate,
  callsPerSecond,
  avgAnswerTime,
  activeChannels,
}: SystemPerformanceProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-blue-600 rounded" />
        <h3 className="text-lg font-semibold">System Performance</h3>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{avgMessageDuration}</div>
          <div className="text-xs text-gray-600 mt-1">Avg Message Duration</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{callSuccessRate}%</div>
          <div className="text-xs text-gray-600 mt-1">Call Success Rate</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{callDropRate}%</div>
          <div className="text-xs text-gray-600 mt-1">Call Drop Rate</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{callsPerSecond}</div>
          <div className="text-xs text-gray-600 mt-1">Calls/Second</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{avgAnswerTime}</div>
          <div className="text-xs text-gray-600 mt-1">Avg Answer Time</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">{activeChannels}</div>
          <div className="text-xs text-gray-600 mt-1">Active Channels</div>
        </div>
      </div>
    </div>
  )
}
