# Part 2: "How I Actually Built It — Next.js, MongoDB, and an AI Coding Agent"

> Target: liandrejohn.com/blog · ~5 min read · Status: **draft, needs screenshots before publishing**
> Series: **Part 2 of 2** — the technical build story. Part 1 (separate file: `blog-post-part1-why.md`) covers the personal story — why so much of this stays manual, what the site is and isn't responsible for. Written to stand alone but references Part 1 — link them to each other once both have URLs.
>
> Where to add images: `![...](screenshot-placeholder.png)` markers mark the spots. Everything else — code, numbers, file paths — is accurate as of 2026-09-15.

---

## Copy-paste this into your blog

[In Part 1](#), I wrote about why I built [Unboxed](https://unboxed.liandrejohn.com) — a small site that rents out 8 personal board games in Metro Manila — and why I kept so much of it manual. This post is about how it actually got built: the stack, the workflow, and a few calls I made along the way that I'd make again.

The [repo is public](https://github.com/lpdecastro/unboxed.liandrejohn.com) if you want to see the whole thing, not just the highlights below.

![placeholder — mobile screenshot of the games page showing the sticky booking summary](screenshot-placeholder-mobile-games.png)

## The stack

Deliberately boring, on purpose — boring tools have more prior art, which matters a lot when an AI coding agent is writing most of the code:

- **Next.js (App Router)**, plain JavaScript, two real pages (`/` and `/games`)
- **Bootstrap + Sass** — no custom design system to invent
- **MongoDB + Mongoose** for games and bookings, read through Server Actions
- **Web3Forms** for email notifications, **Google Places** for address autocomplete, **GA4** for analytics
- **AWS Amplify** for hosting, with GitHub Actions CI/CD

Almost all of it was written through [Claude Code](https://claude.com/claude-code) — but "AI wrote my app" undersells what actually made it work. The process mattered more than the tool.

## The loop that kept it from turning into a mess

Every feature — from "add a mobile carousel to the homepage" to "cap rentals at 7 days" — went through the same six steps, borrowed from plain old engineering discipline and written down so an AI agent (and I) would actually follow it:

```
1. DOCUMENT  →  write a spec, in plain language, before any code
2. BRANCH    →  one feature, one branch
3. IMPLEMENT →  build it against the spec
4. VERIFY    →  prove it works — build passes, behavior actually checked
5. COMMIT    →  only after verification — merge, delete the branch
6. LOG       →  write down what happened, including what didn't go as planned
```

Steps 1 and 6 are the ones worth stealing even if you don't touch AI tooling at all. A spec file sits in the repo forever; a prompt disappears the second the response streams back. And the log is where the actually useful information lives — not "added X," but "tried X, it didn't work because Y, did Z instead." One real entry, verbatim:

```md
Mid-implementation, live testing against the user's real key revealed
the initially-built classic google.maps.places.Autocomplete widget
doesn't work at all on Cloud projects created after March 2025 (only
"Places API (New)" can be enabled) — migrated to the new form-
associated PlaceAutocompleteElement custom element.
```

Without that sentence living in the repo, a future session — mine or an AI's — might "fix" the code back toward the version that looks simpler and is actually broken.

## Verification isn't optional when real money's involved

Unboxed touches real GCash payments and real delivery addresses, so "the agent said it works" was never good enough. Here's what counted as done for the booking-submission feature:

```
Verified directly against MongoDB (a standalone Node script): a
successful booking persists with correct pricing math and is
retrievable/cleanable via the Booking model; overlap, invalid-mobile,
and past-start-date inputs each correctly return
{ success: false, error } without writing anything.
```

An actual script, against the actual database, checking actual rejected inputs — not "looks right." That habit, applied every single time, is most of why I trust a codebase I wrote very little of by hand.

## A few calls I'd make again

**Never let the browser decide what something costs.** Every price, discount, and deposit total is computed server-side, from the database, every time — including a full recheck of availability right before a booking is written. A renter's browser can display a number; it never gets to be trusted for one.

**Not every rough edge is worth fixing right away.** The delivery-address field uses Google's newest Places widget, which — on phones — takes over the whole screen with Google's own dark, native-feeling search UI instead of blending into the rest of the site. I looked into turning that off; there's no supported way to, short of throwing out the widget and building my own dropdown from scratch. For now, that's simply not worth it for something cosmetic, and writing that decision down beats quietly wondering about it later.

**A small, measured win beats a big, guessed one.** I trimmed unused Bootstrap styles the site wasn't using anywhere, which shrank the CSS by a real, measured ~14%. A much bigger performance win was possible — but it needed live-browser testing to avoid a visible flash of unstyled content that I couldn't fully verify in one sitting. Shipping the smaller, provable win and leaving the riskier one for later felt more honest than guessing.

## What I'd tell someone trying this

- Write specs as files, not prompts — the file is what survives.
- Demand proof before committing, every time, even from yourself.
- Log the surprises, not just the successes — that's the part future-you actually needs.
- Boring tech choices are a feature. Nothing in this stack is cutting-edge, and that's exactly why one person could put it together in spare evenings.

[The live site](https://unboxed.liandrejohn.com) is the result. [The full spec history](https://github.com/lpdecastro/unboxed.liandrejohn.com/tree/main/context/features) is public if you want to see spec-to-shipped-code, feature by feature. And if you haven't yet, [Part 1](#) has the personal side of why so much of this is intentionally left to me, by hand.

---

*(End of post. Suggested tags: nextjs, ai-coding, claude-code, mongodb, side-project)*
