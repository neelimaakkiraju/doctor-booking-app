export default function Prescriptions() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>

      {/* Prescription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Prescription */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">JD</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-sm text-gray-500">#MR-001</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                Amoxicillin
              </div>
              <div className="text-sm text-gray-500">500mg</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Ibuprofen</div>
              <div className="text-sm text-gray-500">400mg</div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Prescribed by: Dr. Smith
              </div>
              <div className="text-sm text-gray-500">Date: 2024-03-15</div>
            </div>
          </div>
        </div>

        {/* Completed Prescription */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-medium">AS</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Alice Smith
                </h3>
                <p className="text-sm text-gray-500">#MR-002</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
              Completed
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                Paracetamol
              </div>
              <div className="text-sm text-gray-500">500mg</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Vitamin C</div>
              <div className="text-sm text-gray-500">1000mg</div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Prescribed by: Dr. Johnson
              </div>
              <div className="text-sm text-gray-500">Date: 2024-03-10</div>
            </div>
          </div>
        </div>

        {/* Pending Prescription */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-medium">RJ</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Robert Johnson
                </h3>
                <p className="text-sm text-gray-500">#MR-003</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                Lisinopril
              </div>
              <div className="text-sm text-gray-500">10mg</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">Metformin</div>
              <div className="text-sm text-gray-500">500mg</div>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Prescribed by: Dr. Williams
              </div>
              <div className="text-sm text-gray-500">Date: 2024-03-14</div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription History */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Prescription History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dosage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescribed By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    John Doe
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Amoxicillin</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">500mg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Dr. Smith</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">2024-03-15</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Alice Smith
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Paracetamol</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">500mg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Dr. Johnson</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">2024-03-10</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
