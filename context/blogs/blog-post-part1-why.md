# Part 1: "I Own 8 Board Games. Here's What I Built Around Them."

> Target: liandrejohn.com/blog · ~5 min read · Status: **draft, needs screenshots before publishing**
> Series: **Part 1 of 2** — the personal story: why I built this and what I chose to keep manual. Part 2 (separate file: `blog-post-part2-how.md`) is the technical build story. Written to stand alone but references Part 2 — link them to each other once both have URLs.
>
> Where to add images: `![...](screenshot-placeholder.png)` markers mark the spots. Everything else — numbers, policies, file paths — is accurate as of 2026-09-15.

---

## Copy-paste this into your blog

I own 8 board games — Monopoly, Exploding Kittens, Monopoly Deal, Game of Life, Herd Mentality, Piles, an RC Plane, and Jackstones. Games I bought, played a handful of times, and then watched sit on a shelf. So, mostly for fun, I built [Unboxed](https://unboxed.liandrejohn.com): a small site where people in Metro Manila can rent them from me, pay via GCash, and get them delivered through Lalamove.

This post isn't about the code (that's [Part 2](#)). It's about the decisions that made this a real, working thing I could actually share instead of another idea that stayed half-built in a notes app — because those decisions mattered more than the tech stack did.

![placeholder — homepage hero screenshot showing the game grid](screenshot-placeholder-homepage.png)

## The constraint that shaped everything: it's just me, doing this for fun

No team, no warehouse — 8 physical games and one person (me) coordinating delivery, checking payments, and answering messages by hand, in whatever spare time I have. Every decision below follows from that.

**Payment is GCash, checked manually.** Someone pays the rental fee plus a refundable deposit, sends a GCash reference number, and the booking sits as `pending` until I personally confirm the money actually landed. No payment gateway to integrate, no automated reconciliation. For a handful of bookings a week, "I check my GCash app" beats building and maintaining a payment integration by a wide margin.

**Delivery is Lalamove, coordinated by text.** I arrange the delivery, the renter pays the Lalamove fee directly to the rider, and I text them once it's set. No delivery API — texting someone "Hi Alex! Your booking BG-1024 for September 20–22 is confirmed" is genuinely not a bottleneck at this scale.

**A game is a game — one copy, one booking at a time.** No inventory system, because there's nothing dynamic about 8 physical objects I can see on a shelf.

## Policies that stay consistent even without automation

Doing things by hand only works if the *rules* are still clear and applied the same way every time — the manual part can't turn into a "depends on my mood" part. So the policies are explicit, even though a person (me) enforces them:

- Full payment (rental + deposit) is required before a booking counts as confirmed — no "I'll pay when it arrives."
- The security deposit comes back after I inspect the return, with late fees, damage, or missing pieces deducted from it — never from the rental fee, which is non-refundable once confirmed.
- Cancelling is free before confirmation; once confirmed, only the deposit comes back if the games haven't shipped yet.
- A 10% discount kicks in automatically when someone books 2+ games — a small nudge toward exactly the kind of order that makes one delivery trip worth arranging.

None of that needs code to be *true*. It needs code to be *shown consistently* — which is really the site's job: computing the right numbers every time, not deciding the policy itself.

![placeholder — screenshot of the sticky booking summary showing pricing breakdown with discount applied](screenshot-placeholder-booking-summary.png)

## What the website is actually responsible for

Given how much of this is manual, it's fair to ask what the site even does. Three things, and it does them properly:

1. **Shows real availability.** A booking that overlaps one I've already confirmed gets blocked automatically — nobody can double-book Monopoly, and I don't have to keep a mental calendar.
2. **Computes the real price.** Rental days, the multi-game discount, the deposit total, the grand total — calculated from the actual per-game rates, not typed in by a renter or guessed by me.
3. **Only accepts deliveries inside Metro Manila.** The one hard boundary of the whole idea (outside NCR, Lalamove coordination stops making sense) is caught at the address field, not discovered after someone's already paid.

Everything past that — confirming the payment actually arrived, deciding when a game is ready to hand off, inspecting it on return — stays with me, because I'm the one actually doing the renting-out.

## Why I'm sharing this instead of just linking the site

The easy way to lose momentum on something like this is over-building: a payment gateway integration for 8 games, a full admin dashboard for something I run alone, SMS automation for a few bookings a week. All real, all buildable, none of it necessary at this size — and exactly the kind of scope that turns a fun weekend project into one I never finish.

Deciding early which parts I was happy to keep manual — checking payments, coordinating delivery, inspecting returns — and which parts genuinely needed real logic — availability, pricing, the Metro Manila boundary — is the actual reason [unboxed.liandrejohn.com](https://unboxed.liandrejohn.com) is a real site I can point people to, instead of a repo I stopped touching. How it got built, and the tools I used to build it, are worth their own post — that's [Part 2](#).

---

*(End of post. Suggested tags: side-project, personal-project, mvp, product-thinking)*
