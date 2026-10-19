# The Internet: Cypress End-to-End Tests

End-to-end test automation for [The Internet](http://the-internet.herokuapp.com/), a Sauce Labs practice site with pages built to be tricky to automate. Built with Cypress and JavaScript. Tests run in Chrome on every push through GitHub Actions.

## What was tested

26 tests across six areas:

| Area | Coverage |
|---|---|
| Form authentication | Valid login and logout, invalid username, invalid password, secure page blocked when logged out |
| Form controls | Checkboxes, dropdown, number input, key presses |
| Dynamic content | Remove and re-add a checkbox, enable a disabled input, two dynamic loading examples (hidden element and element added later) |
| JavaScript dialogs | Alert, confirm accepted, confirm cancelled, prompt with typed text, right-click context menu alert |
| Elements | Add and remove buttons, file upload, sortable data table (ascending and descending) |
| HTTP | Status codes 200, 404 and 500 checked with `cy.request`, basic auth rejected without credentials and accepted with them |

## Tools

- Cypress and JavaScript
- GitHub Actions with the official `cypress-io/github-action`

## Project structure

```
cypress/e2e/        One spec file per feature area
cypress/support/    Custom commands: login, statusOf
cypress/fixtures/   File used by the upload test
cypress.config.js   Base URL, timeouts, retries, demo credentials
.github/workflows/ci.yml
```

## Design notes

- No fixed waits. Cypress retries each assertion until it passes or times out, and the timeout is raised to 10 seconds because the site delays some elements on purpose.
- Dialogs are checked through Cypress events and stubs: `window:alert`, `window:confirm`, and a stubbed `window.prompt`.
- Each test starts from a fresh page visit, so tests do not depend on each other.
- Login is a custom command, so tests that need it stay one line.
- The demo credentials come from the site's own login page and live in `cypress.config.js`.
- Failed tests are retried once in CI, and failure screenshots are uploaded as a build artifact.

## How to run

Requires Node.js.

```bash
npm install
npx cypress run              # headless, all specs
npx cypress open             # interactive runner
npx cypress run --spec "cypress/e2e/auth.cy.js"   # one spec
```

## Continuous integration

`.github/workflows/ci.yml` runs the full suite in Chrome on every push to `main` and every pull request. If a test fails, the screenshots are uploaded as a build artifact.

## Results

![CI run passing] (docs/results.png)
