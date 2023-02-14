module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'react/jsx-sort-props': 2,
    'turbo/no-undeclared-env-vars': 'off',
    'react-hooks/rules-of-hooks': 'warn',
  },
};
