# Security Notes

Just some basic security stuff I added before pushing to GitHub:

- Using environment variables for Firebase config (no secrets in code)
- Added some basic security headers in next.config.ts
- Set up Firestore rules so users can only access their own data
- Removed console.logs that had user data
- Basic input sanitization on search and URL params

Still learning about web security, but wanted to make sure I wasn't doing anything obviously wrong.