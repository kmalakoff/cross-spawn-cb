# Changelog

All notable changes to cross-spawn-cb are documented here.

## [3.3.0] - 2026-10-09

### Fixed

- Report signal-terminated child processes as failures in callback, Promise, and synchronous calls, preserving their signal and captured output.
- Throw the original synchronous spawn error instead of treating a failed spawn as success.
