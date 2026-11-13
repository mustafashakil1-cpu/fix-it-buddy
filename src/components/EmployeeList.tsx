import type { Employee, Payslip } from '@/types/tax';
import { formatMoney, type CurrencyCode, type SupportedCountry } from '@/lib/currency';

interface Props {
  payslips: Payslip[];
  onEdit: (employee: Employee) => void;
  onRemove: (id: string) => void;
  onViewPayslip: (id: string) => void;
  country: SupportedCountry;
  currency: CurrencyCode;
}

function EmployeeList({ payslips, onEdit, onRemove, onViewPayslip, country, currency }: Props) {
  if (payslips.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-green-200 bg-white/50 p-6 text-center text-green-500 text-sm">
        No employees added yet. Use the form to add your first employee.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-green-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>
              <th className="text-left px-4 py-3 font-semibold">Name</th>
              <th className="text-left px-4 py-3 font-semibold">Designation</th>
              <th className="text-right px-4 py-3 font-semibold">Net Pay</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {payslips.map(({ employee, netMonthly }) => (
              <tr key={employee.id}>
                <td className="px-4 py-3 text-green-900 font-medium">{employee.name}</td>
                <td className="px-4 py-3 text-green-700">{employee.designation}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-900">
                  {formatMoney(netMonthly, currency)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onViewPayslip(employee.id)}
                      className="text-xs font-medium text-green-700 hover:underline"
                    >
                      Payslip
                    </button>
                    <button
                      onClick={() => onEdit(employee)}
                      className="text-xs font-medium text-blue-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onRemove(employee.id)}
                      className="text-xs font-medium text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
