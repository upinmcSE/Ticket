# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run

Multi-module Maven build. Use the root POM to compile or test the whole tree; use `-pl` to target one module.

```bash
# build everything (no tests)
mvn -f pom.xml clean install -DskipTests

# build a single module (and its dependencies)
mvn -pl start -am clean install

# run a single test class / method
mvn -pl domain test -Dtest=DomainApplicationTests
mvn -pl application test -Dtest=ApplicationTests#methodName

# run the application — `start` is the composition root that wires every module
mvn -pl start spring-boot:run
# or after install: java -jar start/target/start-1.0.0.jar
```

The HTTP server listens on **8080** with Tomcat threads capped at 10 (`start/src/main/resources/application.yaml`) — this low cap is intentional for the ticketing/flash-sale workload, do not raise it casually.

Java 21 is required (set in every module's `maven.compiler.source/target`).

## Module Architecture

This is a **clean/hexagonal-style layered Maven multi-module project**. Dependencies flow inward toward `domain`:

```
start ──▶ controller ──▶ application ──▶ infrastructure ──▶ domain
                                    └──▶ domain
```

- **`domain`** — pure business model. JPA entities (`Ticket`, `TicketDetail`) and **repository interfaces only** (`TicketRepository`, `TicketDetailRepository`). Only depends on `spring-boot-starter-data-jpa`. No Spring web, no implementations. Repository contracts in this module are documented in Vietnamese — preserve that style when adding contracts here.
- **`infrastructure`** — adapters for outbound concerns (will implement domain repositories, hold cache/DB clients). Currently pulls in Redisson for distributed caching; `spring-boot-starter-data-redis` and `postgresql` deps are commented out in `infrastructure/pom.xml` — uncomment when you actually wire those backends, don't re-add as new entries.
- **`application`** — use-cases / orchestration layer. Depends on `domain` + `infrastructure`. This is where service classes coordinating domain repositories belong.
- **`controller`** — HTTP/REST adapters. Depends on `application`. Add `@RestController` classes here, not in `start`.
- **`start`** — composition root and Spring Boot entry point (`StartApplication`). Adds Prometheus micrometer registry. **This is the only module you should run** — it's the one whose classpath includes everything.

**Watch out:** every module currently has its own `@SpringBootApplication` class (`Application`, `ControllerApplication`, `InfrastructureApplication`, `StartApplication`). Only `StartApplication` is the real entry point; the others exist as scaffolding from `spring-initializr` and will be picked up by component scanning if you `cd` into a sub-module and run it. When adding `@Configuration` / `@ComponentScan` tuning, do it in `start` (or scoped to the right package) — not in the per-module application classes.

## Cross-cutting Dependencies (declared in root `pom.xml`)

Every module inherits these without re-declaring:

- `spring-boot-starter-web`, `spring-boot-starter-actuator`, `spring-boot-starter-aop`, `spring-boot-starter-validation`
- `resilience4j-spring-boot3` 2.2.0 — circuit breakers / rate limiting for the flash-sale path
- `lombok` — entities use `@Getter @Setter @Accessors(chain=true) @NoArgsConstructor @AllArgsConstructor`; follow that pattern
- `guava` 33.5.0-jre

If a dependency is only needed by one module (e.g. Redisson for `infrastructure`, micrometer-prometheus for `start`), declare it there, not at the root.

## Domain Notes

- `Ticket` is the activity/event; `TicketDetail` (table `ticket_item`) is the sellable SKU with `stockInitial` / `stockAvailable` / `priceFlash` — designed for flash-sale style inventory.
- Status fields use mixed conventions: `Ticket.status` is the `TicketStatus` enum (`ACTIVE`/`INACTIVE`/`DELETED`); `TicketDetail.status` is a raw `int` (`0=INACTIVE, 1=ACTIVE, 2=DELETED`). Don't unify these without explicit instruction — the int form is referenced by the soft-delete contract in `TicketRepository.deleteTicket`.
- `TicketRepository.deleteTicket` is **soft delete** (set status=2 + cascade soft-delete `TicketDetail`s). `TicketDetailRepository.deleteById` / `deleteByActivityId` are documented as **hard delete**. Respect that asymmetry.