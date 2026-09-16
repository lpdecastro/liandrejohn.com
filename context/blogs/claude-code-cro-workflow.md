# How I Built a CRO Copywriting Workflow in Claude Code

Most AI copywriting sessions follow the same shape: prompt, draft, correction, correction, more context, rewrite, more correction. You paste in the brand voice again. You re-explain the audience again. You catch an invented claim on the third pass because nobody was checking for it on the first two. The chat window becomes the workflow, and you become the orchestrator, re-deriving the same process by hand every time you need a new piece of copy.

The fix I landed on wasn't a longer or cleverer prompt. It was moving the process out of the conversation and into a Claude Code workspace: a fixed pipeline of skills, subagents, and reference material that runs the same sequence every time. This article walks through that architecture — an orchestrating skill, four subagents with narrow jobs, a references folder the orchestrator pulls from selectively, and an evaluation rubric — using a fictional nighttime supplement landing page as the running example so no real client work is exposed.

## The Problem With One Long Conversation

The correction loop happens because a single chat thread has no persistent structure. Nothing forces the model to check brand facts before writing a headline, or to separate "what's the strategy" from "what's the sentence." Reference material — brand guidelines, past research, CRO frameworks — might exist somewhere on your machine, but it only enters the conversation if you remember to paste it in, and you rarely paste in all of it, consistently, every session. The result is that every session re-derives context the model should already have: who the audience is, what's already been tried, which claims are off-limits. That re-derivation is where the correction cycles come from.

## The Shape of the Fix

The structural fix is a pipeline with fixed stages and file handoffs between them, instead of one long back-and-forth:

```
Brief
  → Research
    → Strategy
      → Draft
        → Independent Critique
          → Revision
            → Evaluation
              → Final copy
```

Each arrow is a handoff between a defined role, not a follow-up message in the same thread. The researcher doesn't write copy. The critic doesn't see the copywriter's reasoning, only the draft. Nothing moves to the next stage without the artifact from the previous one existing as a file. That's the whole idea: turn a conversation into a workspace with fixed roles and file handoffs.

## The Workspace

In Claude Code terms, that pipeline becomes a folder structure:

```
claude-copy-workspace/
├── CLAUDE.md
├── .claude/
│   ├── skills/
│   │   └── landing-page-copy/
│   └── agents/
│       ├── researcher.md
│       ├── strategist.md
│       ├── copywriter.md
│       └── critic.md
├── references/
├── projects/
└── evals/
```

Each piece has one job:

- **`CLAUDE.md`** — global policy only: goals, workflow order, how much autonomy to take. No brand facts, no copywriting rules.
- **`.claude/skills/`** — orchestration. The skill defines the sequence and which files to read and write; it doesn't contain domain knowledge itself.
- **`.claude/agents/`** — isolated roles. Each subagent gets a narrow job and only the context it needs for that job.
- **`references/`** — durable domain knowledge: frameworks, brand facts, customer research, examples.
- **`projects/`** — one folder per product or campaign, holding that project's research, strategy, drafts, and critique.
- **`evals/`** — the standard the final copy gets checked against.

I didn't build this CRO workspace as a separate project to write this article. I didn't need to — I'm already running a structurally identical pipeline in the repository this article lives in, just applied to portfolio articles instead of landing pages: a `CLAUDE.md`, an `article` skill, three subagents (researcher, writer, editor), a `references/` folder, and an `evals/` rubric. This article went through that pipeline — a researcher agent gathered the source material, and I'm producing this draft from it, with an editor agent reviewing it independently before it's finalized. The CRO version below uses four agents instead of three because CRO copy separates strategy from writing in a way an article outline doesn't need to; more on that shortly.

## The Skill Is the Orchestrator, Not the Brain

A skill's job is to run the fixed sequence, not to know the domain: read the brief, find the references relevant to this step, run research, produce a strategy, write the first draft, request an independent critique, revise once, then evaluate against the rubric. A step inside a skill like that might read something like this:

```
### 2. Research
Use the researcher agent.
Gather only information relevant to this project's brief.
Save:
projects/{project-name}/research.md
```

Notice what's missing: there's no copywriting theory in that step, no brand voice rules, no list of approved claims. The skill says what happens and where the output goes — it doesn't say how to write good copy. That knowledge lives one layer down, in `references/`. The skill stays short and stable even as the domain knowledge underneath it grows or changes, someone can update a CRO framework without touching the orchestration logic, and the orchestrator can load only the reference file relevant to the current step — the researcher doesn't need CTA-writing guidance, the copywriter doesn't need raw customer-interview notes. Business knowledge doesn't belong embedded in the skill because the skill's job is sequencing, not expertise.

## Reference Material: Selective, Not Total

The `references/` folder is where the actual domain knowledge lives: copywriting principles, CRO frameworks, course notes, good examples, brand information, customer research, product information. It can grow large over time without slowing anything down, because nothing requires it all to load at once.

The important idea is selective context. The orchestrator decides what's relevant to the current step and loads that — not the entire library, every time, for every agent. A step focused on objection-handling might pull in customer research and a CRO framework doc; a step focused on tone might pull in a brand voice guide instead. That's a deliberate constraint, not a limitation of the tooling: dumping everything into every call doesn't make output better, it just makes the context noisier.

## Four Agents, Four Jobs

The CRO pipeline splits into four subagents, each with one job and explicit boundaries on what it's not supposed to do:

```
Researcher   → pains, desired outcomes, objections, proof, product
               benefits, customer language
Strategist   → target customer, awareness level, positioning,
               primary promise, objection strategy, page flow
Copywriter   → the complete first draft
Critic       → independent assessment: clarity, specificity,
               differentiation, proof, objections, CTA, page
               hierarchy, unsupported claims — flags problems,
               doesn't rewrite
```

The critic matters most as a design choice. If the same context that wrote the draft also grades it, you get the model defending its own choices — the equivalent of asking a writer to self-edit five minutes after finishing a piece. The critic agent only sees the draft, the brief, and the strategy, not the copywriter's reasoning about why a particular headline was chosen. That's what makes "independent critique" mean something instead of being the same pass dressed up as a second one.

Four agents isn't a fixed number, though. In the three-agent version running this article, there's no separate strategist — the outline step folds strategy into the skill itself, done directly rather than delegated to a subagent, because for a portfolio article "what's the angle and section order" doesn't benefit from a fully isolated context the way CRO strategy does. The lesson underneath both setups is the same: give a step its own subagent when isolated context actually changes the output, not by default.

## Walking Through the Fictional Example

To make this concrete without exposing real client work, I'll use a fictional product: a magnesium glycinate nighttime capsule, explicitly melatonin-free, aimed at busy professionals who have trouble winding down after work. This product doesn't exist — I invented it for this article, and none of the copy below is real or tested.

Run through the pipeline, here's what each stage would plausibly produce — not what one did:

- **Research** would surface customer language like "can't switch off after work" and "mind races at 11pm," an objection around morning grogginess associated with sleep aids generally, and one plain product fact: magnesium glycinate, capsule, taken nightly.
- **Strategy** would decide the target customer is already aware supplements exist but skeptical of melatonin-based ones, set the primary promise around a wind-down routine rather than any medical outcome, and sequence the page: pain → why a melatonin-free alternative exists → ingredient-level mechanism → routine and CTA.
- **Draft** would turn that into a headline built around the wind-down problem rather than a health claim, a subhead naming the melatonin-free angle, a body section that meets the grogginess objection directly, and a CTA framed around starting the nightly routine.
- **Critique** would check the draft for anything that drifts into an implied medical or efficacy claim, confirm the melatonin-free point reads as a fact about ingredients rather than an implied benefit, flag vague proof language like "many people love it," and review CTA clarity and page hierarchy.

That's the shape of the pattern, not a finished landing page — I haven't run this four-agent version end to end, and nothing here should be read as tested or proven copy. It's here to show what each stage produces, not to claim a result.

## Why an Evaluation Rubric Matters

Once a draft is revised, it needs to be checked against something more consistent than "does this look good?" A rubric turns that judgment into a written, repeatable standard. Reasonable criteria for landing page copy:

```
- Clear audience
- Clear problem
- Strong value proposition
- Specific benefits
- Appropriate proof
- Objections addressed
- CTA clarity
- Logical flow
- No invented claims
```

The point isn't a score for its own sake. It's a fixed standard you can apply the same way across different drafts or different versions of the workflow, so when you change something — a reference doc, an agent's instructions, the pipeline order — you have a consistent way to tell whether the output actually got better.

## Before vs. After

Conceptually, here's what changes — no time measurements, because none exist:

```
Traditional:
User → prompt → draft → correction → draft → more context
     → correction → final

Structured:
User → brief → automated workflow → reviewed draft → user review
```

The real shift isn't speed, it's role. In the traditional loop, the user steers every single step. In the structured version, the user writes the brief once and reviews a draft that's already been through research, strategy, and an independent critique before it reaches them.

## What I Learned

- Skills are for repeatable sequences, not one-off requests — they're worth building once you're running the same process more than a couple of times.
- Subagents help where isolated context genuinely changes the output — the critic is the clearest case here — not by default for every step.
- Keep `CLAUDE.md` small. It's global policy, not domain knowledge.
- Domain knowledge belongs in `references/`, editable independently of the orchestration logic.
- Independent critique only works if the critic doesn't inherit the writer's reasoning.
- Limit automatic revision to one pass. Unbounded revision loops are just the original correction cycle, automated.
- Evaluate against criteria you wrote down in advance, not a fresh judgment call each time.

None of that makes the output trustworthy on its own, though. It's worth being direct about where this architecture stops.

## Limitations

This architecture doesn't remove the need for human judgment before anything ships:

- Copy still needs a human read before publishing — the pipeline reduces steering, not review.
- Product claims have to be verified against real facts; no agent here can confirm a claim is true, only that it's phrased carefully.
- Output is bounded by reference quality — thin customer research still produces weak copy, just more consistently.
- An eval rubric checks structural quality, not whether the page actually converts.
- Real CRO requires actual user behavior and conversion data. This workflow produces a well-structured draft, not a validated one.

## Conclusion

The biggest improvement in this kind of workflow doesn't come from writing a bigger prompt. It comes from separating tasks, giving each one the context it actually needs, retrieving reference material selectively, and checking the result against a written standard instead of a fresh judgment call each time. None of that is exotic — it's normal software engineering discipline applied to a writing process.

The pieces themselves aren't specific to copywriting. A brief, isolated roles, selective reference retrieval, independent critique, and a written rubric apply just as well to any knowledge work you'd otherwise redo from scratch in chat each time. I work on Claude Code and AI-assisted engineering workflows, and this is the same file-based shape I reach for outside of copywriting too.

## Resources

- Claude Code documentation on skills and subagents (see docs.claude.com/claude-code — verify the exact current page paths before linking, as they may change)
- This repository's own `article` skill and `researcher`/`writer`/`editor` agents, which produced this article using the three-agent version of this pattern
