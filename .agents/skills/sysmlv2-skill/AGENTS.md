# Agent Instructions

## Scope

These instructions apply to this repository.

This is an Agent Skill project for SysML v2 systems modeling.

## Project Purpose

Provide AI agents with authoritative guidance for creating valid SysML v2 models with correct syntax based on OMG specifications.

## File Structure

- `SKILL.md` - Main skill file loaded by agents (required by Agent Skills spec)
- `references/` - Detailed reference documentation loaded on-demand
  - `SYNTAX.md` - Complete syntax rules
  - `PATTERNS.md` - Reusable modeling patterns
  - `ERRORS.md` - Error troubleshooting

## Guidelines

When modifying this skill:

1. Keep `SKILL.md` concise - detailed content belongs in `references/`
2. All SysML examples must use valid SysML v2 syntax
3. Follow the [Agent Skills Specification](https://agentskills.io/specification)
4. The skill name must match the directory name: `sysmlv2-skill`
5. No external runtime dependencies in the skill itself

## SysML v2 Syntax Reminders

Critical rules when writing examples:

- Import statements require visibility: `private import ScalarValues::*;`
- Attribute defs must specialize: `attribute def Region :> String;`
- Basic types (String, Real, Integer, Boolean) require ScalarValues import

## Validation

Use `validate-sysml` from the sysmlv2-validator project.
