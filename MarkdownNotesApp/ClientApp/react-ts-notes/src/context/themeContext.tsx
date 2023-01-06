import * as React from 'react';
import { createContext, useState } from 'react';
import { Theme, ThemeContextType, ThemeProviderProps } from '../@types/theme';


export const ThemeContext = createContext<ThemeContextType | null>(null);



const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {

    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = (): void => {
        setTheme((curr: string) => (curr === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;