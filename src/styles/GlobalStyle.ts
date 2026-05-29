import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #6366f1;
    --primary-hover: #4f46e5;
    --bg-color: #f8fafc;
    --text-main: #0f172a;
    --text-muted: #64748b;
    --card-bg: #ffffff;
    --border: #e2e8f0;
    --danger: #ef4444;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
  }
`;
