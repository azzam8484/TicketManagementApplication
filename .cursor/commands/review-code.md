# Review Code

When this command is run, review the relevant code and report findings.

## Steps

1. If `graphify-out/graph.json` exists, run `graphify query "<area or question>"` before broad exploration
2. Compile:
   - Maven: `./mvnw -q -DskipTests compile`
   - Gradle: `./gradlew compileJava -q`
3. Run only lint/static-analysis tasks already defined in the project
4. Review for: bugs, API contract breaks, security issues, layering violations
5. Report findings by severity: bug, contract, security, maintainability

## Constraints

- Follow Java Spring Boot, API Standards, and Testing rules; do not redefine them
- Do not invent tools or scripts not present in the repo
- Prefer minimal, concrete findings with file paths
