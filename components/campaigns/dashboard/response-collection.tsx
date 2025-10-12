"use client"

interface ResponseCollectionProps {
  totalResponses: number
  responseRate: number
}

export function ResponseCollection({ totalResponses, responseRate }: ResponseCollectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-6 bg-blue-600 rounded" />
        <h3 className="text-lg font-semibold">Response Collection</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-3xl font-bold text-blue-600">{totalResponses}</div>
          <div className="text-sm text-gray-600 mt-1">Total Responses</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-green-600">{responseRate}%</div>
          <div className="text-sm text-gray-600 mt-1">Response Rate</div>
        </div>
      </div>
    </div>
  )
}
