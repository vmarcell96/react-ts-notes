// components/ThemeWrapper.tsx
import React from 'react';
import { Form } from 'react-bootstrap';
import { ThemeContextType, Theme, ThemeWrapperProps } from '../@types/theme';
import { ThemeContext } from '../context/themeContext';

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {

    const { theme, toggleTheme } = React.useContext(ThemeContext) as ThemeContextType;


    return (
        <>
            <div className="Theme-wrapper" data-theme={theme}>
                <Form.Check
                    onChange={toggleTheme}
                    type="switch"
                    id="custom-switch"
                />

                {children}
            </div>
        </>
    );
};
export default ThemeWrapper;