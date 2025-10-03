# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in this project, please report it by opening an issue. For sensitive security matters, please contact the maintainers directly.

## Secure Configuration

### API Keys and Secrets

This project uses environment variables to manage sensitive configuration:

1. **Never commit API keys** - All API keys should be stored in `.env` files that are excluded from version control
2. **Use `.env.example`** - A template file is provided to document required environment variables
3. **Rotate exposed keys immediately** - If an API key is accidentally exposed, revoke it immediately in the service console

### Firebase Security

The Firebase configuration in `src/config/firebase.js` is designed to:
- Load credentials from environment variables
- Fail gracefully if credentials are missing
- Provide clear warnings when configuration is incomplete

### What to Do If a Secret is Leaked

If you accidentally commit a secret to the repository:

1. **Revoke the secret immediately** in the service console (e.g., Firebase Console)
2. **Generate a new secret** and update your local `.env` file
3. **Remove the secret from git history** (this may require force-pushing, contact maintainers)
4. **Update documentation** if the incident reveals gaps in security practices

## Best Practices for Contributors

- Always use the `.env.example` as a template for your local `.env` file
- Never hardcode secrets in source code
- Review your commits before pushing to ensure no secrets are included
- Use environment-specific configuration files when needed
