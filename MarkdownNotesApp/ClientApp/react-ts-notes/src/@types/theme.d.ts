
export type Theme = 'light' | 'dark';
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

//Have to include PropsWithChildren type myself because is omitted from the props type of a FunctionalComponent after React 18
export interface ThemeProviderProps {
    children: React.ReactNode;
}

export interface ThemeWrapperProps {
    children: React.ReactNode;
}