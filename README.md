# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 🔨 Prerequisites

    git --version
    # 2.36.1
    node --version
    # v20.9.0
    yarn --version
    # 1.22.19

## 📦 Run scripts

Install packages:

    yarn

Start development:

    yarn dev

## 🖥 Code Structure

```shell
.
├── README.md                                           # README file
├── .vscode                                             # VSCode configuration
├── dist                                                # Dist
├── public                                              # Public folder
├── src
│   ├── assets                                          # Asset folder: image  
│   ├── components                                      # Components
│   │   ├─── common                                     # Common components
│   │   │    ├─── Button         
│   │   │    ├─── Input          
│   │   │    ├─── ...         
│   │   ├─── layouts                                    # Layout components
│   │   │    ├─── Header     
│   │   │    ├─── Footer
│   │   │    ├─── ...        
│   ├── pages                                           # The pages folder contains all the project's pages
│   │   ├─── Home
│   │   ├─── ...                                        # Other pages
│   ├── redux                                           # Redux
│   │   ├─── reducers                                   # Redux reducers 
│   │   ├─── stores                                     # Redux store     
│   ├── resources                                       # Resources  
│   │   ├─── locales    
│   │   │    ├─── en
│   │   │    ├─── vi    
│   ├── services                                        # Request API
│   ├── utils                                           # Utility functions, constants, config,...
├── .eslintrc.json              
├── .prettierrc.json
├── postcss.config.js   
├── tailwind.config.js                                  # Tailwind configuration
├── tsconfig.json
└── vite.config.js                                      # Vite configuration
```

## 📙 Technical Documents

- React Design Patterns and Best Practices: https://www.packtpub.com/product/react-design-patterns-and-best-practices/9781786464538
- ReactJS: https://react.dev/
- ViteJS: https://vitejs.dev/
- Tailwind: https://tailwindcss.com/docs/installation
