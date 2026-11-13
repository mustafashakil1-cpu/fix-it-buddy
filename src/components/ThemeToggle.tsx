import { useTheme } from '@/hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="px-2.5 py-2 rounded-md text-sm font-medium text-green-800 dark:text-green-100 hover:bg-green-100 dark:hover:bg-slate-700 transition-colors"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
