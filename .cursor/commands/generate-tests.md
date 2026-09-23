# Generate Tests

When this command is run, generate or update tests for the target code.

## Steps

1. Identify the code under test from the user selection, open files, or recent changes
2. Generate tests that follow the Testing Guidelines rule
3. Cover: happy path, validation failure, not-found, and conflict where applicable
4. Run tests:
   - Maven: `./mvnw -q test`
   - Gradle: `./gradlew test`
5. Report covered cases and any acceptance criteria still untested

## Constraints

- Do not change production code unless a test cannot be written otherwise; if production must change, state why
- Do not invent test frameworks not used by the project
- Prefer project wrappers (`./mvnw`, `./gradlew`) when present
