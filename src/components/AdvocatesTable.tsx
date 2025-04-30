import React from 'react';
import { Advocate } from '../models/Advocate';

interface AdvocatesTableProps {
  advocates: Advocate[];
  totalCount: number;
}

const AdvocatesTable: React.FC<AdvocatesTableProps> = ({ advocates, totalCount }) => {
  if (advocates.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No advocates found.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{advocates.length}</span> of <span className="font-medium">{totalCount}</span> advocates
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Degree
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialties
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advocates.map((advocate) => (
              <tr key={advocate.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {advocate.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {advocate.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {advocate.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {advocate.degree}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((specialty) => (
                      <span key={specialty} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {advocate.yearsOfExperience} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {advocate.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvocatesTable;
