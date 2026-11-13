import { useEffect, useState } from 'react';
import type { Employee } from '@/types/tax';
import type { SupportedCountry } from '@/lib/currency';

const STORAGE_KEY = 'taxsaathi_employees';
export const MAX_EMPLOYEES = 10;

function loadEmployees(): Employee[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Employee[];
  } catch {
    return [];
  }
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>(() => loadEmployees());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  function addEmployee(employee: Omit<Employee, 'id'>): boolean {
    const country = employee.country ?? 'PK';
    if (employees.filter((item) => (item.country ?? 'PK') === country).length >= MAX_EMPLOYEES) return false;
    setEmployees((prev) => [...prev, { ...employee, id: crypto.randomUUID() }]);
    return true;
  }

  function updateEmployee(id: string, updates: Omit<Employee, 'id'>) {
    setEmployees((prev) => prev.map((e) => (e.id === id ? { ...updates, id } : e)));
  }

  function removeEmployee(id: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  return {
    employees,
    addEmployee,
    updateEmployee,
    removeEmployee,
    isFull: employees.length >= MAX_EMPLOYEES,
    isFullFor: (country: SupportedCountry) => employees.filter((item) => (item.country ?? 'PK') === country).length >= MAX_EMPLOYEES,
  };
}
