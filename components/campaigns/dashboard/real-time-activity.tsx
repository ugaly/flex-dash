"use client"

interface RealTimeActivityProps {
  activeCalls: number
  callsPerSecond: number
  rejection: number
  connectionRate: number
  noAnswer: number
  currentProgress: number
  totalProgress: number
}

export function RealTimeActivity({
  activeCalls,
  callsPerSecond,
  rejection,
  connectionRate,
  noAnswer,
  currentProgress,
  totalProgress,
}: RealTimeActivityProps) {
  const progressPercentage = totalProgress > 0 ? (currentProgress / totalProgress) * 100 : 0

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600" />
          <h3 className="text-lg font-semibold">Real-time Broadcast Activity</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-sm text-blue-600 font-medium">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{activeCalls}</div>
          <div className="text-sm text-gray-600 mt-1">Active Calls</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{callsPerSecond}</div>
          <div className="text-sm text-gray-600 mt-1">Calls per Second</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{rejection}</div>
          <div className="text-sm text-gray-600 mt-1">Rejection</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{connectionRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Connection Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{noAnswer}%</div>
          <div className="text-sm text-gray-600 mt-1">No Answer</div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Current Broadcast Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {progressPercentage.toFixed(0)}% ({currentProgress}/{totalProgress})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
