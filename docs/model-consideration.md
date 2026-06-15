# Document 3: Models to Consider for the Build Small Hackathon

> **Note (2026-06-14):** This is a reference catalog of the models presented at the
> HF live session — not the build's decision. **The app shipped on Qwen3**
> (`Qwen/Qwen3-4B-Instruct-2507`, 4-bit, with Qwen3-1.7B as the small option), not
> MiniCPM: MiniCPM's remote modeling code broke on transformers 5.x. The actual
> model/backend decision and rationale live in
> [`docs/adr/0002-pluggable-backend-seam.md`](adr/0002-pluggable-backend-seam.md)
> and `tinycourt/config.py`. The catalog below is kept for historical context.

## Purpose

This document summarizes the models and deployment notes shared during the Hugging Face live session.

The goal is to help the builder choose an appropriate model family for the hackathon app while staying aligned with the core challenge:

> Build a Hugging Face Space powered by models under 32B parameters.

The models below are especially relevant because they support the hackathon’s “build small” philosophy: lightweight, focused, practical, and suitable for Gradio applications.

---

# 1. Text Models

## MiniCPM5-1B

## Summary

MiniCPM5-1B is a lightweight and fast text model.

It is positioned as a good fit for local-first applications and simple text workflows where speed, responsiveness, and low resource usage matter more than deep reasoning.

## Best For

MiniCPM5-1B is especially suitable for:

* local personal assistants,
* lightweight writing helpers,
* study tutors,
* lightweight chatbots,
* form helpers,
* email helpers,
* note helpers.

## When to Consider It

Use MiniCPM5-1B when the app needs to be fast, small, and simple.

Good use cases include:

* rewriting short text,
* classifying short user inputs,
* generating labels or titles,
* drafting simple messages,
* turning notes into structured output,
* creating quick summaries,
* assisting with simple forms.

## Hackathon Fit

MiniCPM5-1B is a strong candidate for the **Tiny Titan** special award because it is genuinely small.

It is a good fit if the app is carefully scoped and does not depend on complex multi-step reasoning.

## Strengths

* Very small.
* Fast.
* Good for local-first experiences.
* Easier to run within constrained resources.
* Good match for simple user-facing Gradio apps.

## Limitations

* Not ideal for deep reasoning.
* Not ideal for complex planning.
* Not ideal for long or nuanced conversations.
* May need strong UI constraints and structured prompts.

## Best Project Types

MiniCPM5-1B is best for projects like:

* note-to-checklist assistant,
* form-filling helper,
* simple writing assistant,
* lightweight tutor,
* quick classification app,
* simple personal productivity helper.

---

# 2. Stronger Text Reasoning Model

## MiniCPM4.1-8B

## Summary

MiniCPM4.1-8B is a stronger text model for reasoning and problem-solving.

It is recommended for applications that need deeper thinking than a 1B model can reliably provide, while still remaining far below the hackathon’s 32B parameter limit.

## Best For

MiniCPM4.1-8B is especially suitable for:

* reasoning assistants,
* study solvers,
* planning assistants,
* research helpers,
* structured decision-making apps.

## When to Consider It

Use MiniCPM4.1-8B when the app needs:

* better instruction following,
* stronger reasoning,
* multi-step outputs,
* structured analysis,
* planning,
* comparison,
* explanation,
* more consistent creative writing.

## Hackathon Fit

MiniCPM4.1-8B is likely the safest general-purpose text model choice among the shared options.

It is still small enough to fit the spirit of the hackathon, but powerful enough for polished product experiences.

## Strengths

* Stronger reasoning than 1B-class models.
* Good for structured app flows.
* Useful for both practical and creative projects.
* Can power multi-role interactions.
* Suitable for agent-like workflows.

## Limitations

* Heavier than 1B models.
* May be slower or more resource-intensive.
* Still benefits from strong structure and deterministic app logic.

## Best Project Types

MiniCPM4.1-8B is best for projects like:

* scheduling assistant,
* research planning helper,
* structured decision assistant,
* multi-step form assistant,
* Tiny Court of Everyday Crimes,
* Bureau of Lost Things,
* interactive fiction with state,
* guided document assistant.

## Relevance to Tiny Court of Everyday Crimes

MiniCPM4.1-8B is a strong candidate for Tiny Court because the app needs:

* role-based writing,
* comedic reasoning,
* structured phases,
* verdict logic,
* evidence interpretation,
* short but coherent trial scenes.

The app should still use a controlled interaction structure. The model should generate courtroom content, but the application should manage the flow.

---

# 3. Voice and Audio Model

## VoxCPM2

## Summary

VoxCPM2 is an end-to-end voice generation model.

It supports text-to-speech, voice cloning, and creative audio workflows.

## Best For

VoxCPM2 is especially suitable for:

* voice storytellers,
* character voice generation,
* audio postcards,
* voice companions,
* language-learning voice practice.

## When to Consider It

Use VoxCPM2 when voice is central to the user experience, not just an optional add-on.

Good use cases include:

* character narration,
* generated dialogue,
* spoken verdicts,
* audio roleplay,
* personalized story audio,
* language practice,
* interactive voice characters.

## Hackathon Fit

VoxCPM2 is especially interesting for **An Adventure in Thousand Token Wood**, where delight, character, and presentation matter.

It could make a playful project feel more alive.

## Strengths

* Adds personality and theatricality.
* Useful for story, roleplay, and character apps.
* Can make demos more memorable.
* Good fit for creative audio experiences.

## Limitations

* Audio generation can increase latency.
* Voice features may complicate the app.
* Voice cloning should be handled carefully and ethically.
* Not necessary for every project.

## Best Project Types

VoxCPM2 is best for projects like:

* voice storyteller,
* character dialogue generator,
* interactive radio drama,
* audio postcard creator,
* language pronunciation partner,
* courtroom judge voice,
* witness testimony generator.

## Relevance to Tiny Court of Everyday Crimes

VoxCPM2 could be used as a bonus feature for Tiny Court.

Possible uses:

* judge reads the verdict aloud,
* bailiff announces the case,
* witness testimony is spoken,
* final court record includes a short audio ruling.

Recommended usage:

Use voice only for the most important moments, such as the verdict or opening announcement. Do not make every line audio, because that may slow down the experience.

---

# 4. Vision and Multimodal Models

## MiniCPM-V 4.6

## Summary

MiniCPM-V 4.6 is recommended as a go-to model for image understanding, OCR, document assistants, and video understanding.

It is useful when the user provides an image, screenshot, receipt, bill, document, manual page, or visual scene.

## Best For

MiniCPM-V 4.6 is especially suitable for:

* receipt and bill parsers,
* screenshot helpers,
* homework image tutors,
* repair manual readers,
* shop menu assistants,
* visual puzzle games,
* document assistants,
* image understanding apps,
* OCR-heavy workflows,
* video understanding tasks.

## When to Consider It

Use MiniCPM-V 4.6 when images are central to the app.

Good use cases include:

* upload receipt, extract expenses,
* upload bill, explain charges,
* upload lease page, summarize clause,
* upload appliance manual, explain repair steps,
* upload menu, recommend meal,
* upload photo evidence for a playful trial,
* upload object photo for a story generator.

## Hackathon Fit

MiniCPM-V 4.6 is especially strong for **Backyard AI** apps where real users have messy documents, receipts, screenshots, or forms.

It can also be useful for **Thousand Token Wood** if visual input becomes part of the game.

## Strengths

* Strong visual understanding.
* Useful for OCR.
* Good for document workflows.
* Good for practical real-world problems.
* Supports richer user input than text-only apps.

## Limitations

* More complex than text-only apps.
* Image upload and processing must be designed carefully.
* OCR errors should be surfaced transparently.
* The app should show what it extracted so users can verify it.

## Best Project Types

MiniCPM-V 4.6 is best for projects like:

* lease explainer,
* receipt organizer,
* repair manual helper,
* bill parser,
* screenshot summarizer,
* homework image tutor,
* form assistant,
* visual scavenger game.

## Relevance to Tiny Court of Everyday Crimes

MiniCPM-V 4.6 could add a fun optional feature:

**Submit photographic evidence.**

The user uploads a photo of:

* spilled coffee,
* broken mug,
* empty yogurt container,
* mysterious crumbs,
* tangled cables,
* missing sock scene,
* pet near the crime scene.

The app turns the image into an evidence card.

Example:

**Exhibit A: The Spilled Coffee Scene**
The court observes a mug, a suspicious puddle, and possible feline proximity.
**Ruling:** Admitted with dramatic concern.

This could make Tiny Court feel more interactive and visually distinct.

---

# 5. Omni-Modal Model

## MiniCPM-o 4.5

## Summary

MiniCPM-o 4.5 is described as a full-duplex omni-modal model.

It can continuously see, listen, and speak naturally.

## Best For

MiniCPM-o 4.5 is especially suitable for:

* voice and vision companions,
* interactive AI guides,
* multimodal roleplay assistants,
* live storytellers,
* full-duplex agent applications.

## When to Consider It

Use MiniCPM-o 4.5 when the app is designed around a live multimodal interaction loop.

Good use cases include:

* interactive guide that sees and speaks,
* live roleplay companion,
* voice plus vision storytelling,
* assistant that reacts to a camera or image stream,
* multimodal agent that listens and responds.

## Hackathon Fit

MiniCPM-o 4.5 is ambitious and could be powerful for advanced demos.

It is especially relevant for projects competing for:

* Best Agent,
* Off-Brand,
* Thousand Token Wood,
* multimodal sponsor awards.

## Strengths

* Supports rich interaction.
* Can combine seeing, listening, and speaking.
* Strong fit for highly polished demos.
* Can make an app feel alive.

## Limitations

* More complex to design.
* More complex to demo reliably.
* Risk of overbuilding.
* May distract from the core experience if used unnecessarily.

## Best Project Types

MiniCPM-o 4.5 is best for projects like:

* live AI guide,
* interactive storyteller,
* multimodal roleplay character,
* visual assistant with voice,
* museum guide,
* live courtroom performer,
* voice-and-image companion.

## Relevance to Tiny Court of Everyday Crimes

MiniCPM-o 4.5 could support a very ambitious version of Tiny Court:

* the user speaks the complaint,
* the judge responds aloud,
* the user uploads or shows evidence,
* the courtroom reacts in character,
* the verdict is delivered as audio.

However, this should only be attempted if the core text-based version is already polished.

For a hackathon, reliability is more important than complexity.

---

# 6. Free API Notes from the Live Share

The live-share screenshots included free API endpoints for several MiniCPM models.

The listed endpoints included:

* MiniCPM4.1-8B
* MiniCPM-V-4.5
* MiniCPM-V-4.6
* MiniCPM-V-4.6-Thinking

The screenshots also showed an OpenAI-compatible chat completions format.

## Important Security Note

The screenshot visibly included an authorization bearer token.

Do not publish that token.

Do not include it in:

* GitHub repositories,
* Hugging Face Space source files,
* README files,
* demo videos,
* screenshots,
* frontend JavaScript,
* public logs,
* browser-visible code.

Use environment variables or Hugging Face Space secrets for credentials.

In public documentation, write:

Authorization: Bearer YOUR_TOKEN_HERE

Never hard-code the real token.

---

# 7. Deployment Options Mentioned

The live share mentioned two deployment approaches:

1. vLLM
2. llama.cpp

These are not required product choices, but they are relevant when deciding how to serve models.

---

## vLLM

## Summary

vLLM is recommended for GPU serving, high throughput, and OpenAI-compatible APIs.

## Best For

Use vLLM when:

* serving on GPU,
* expecting multiple users,
* needing better throughput,
* using OpenAI-compatible chat APIs,
* building a reliable hosted backend.

## Strengths

* Good serving performance.
* Works well for chat-completion-style apps.
* Good for hosted demos.
* Suitable when the app may receive many judge/community visits.

## Consideration

The live-share recommendation suggested a path like:

Prototype with Transformers → Gradio → Hugging Face Spaces → vLLM for better throughput.

This implies that builders can start simple and only optimize serving later.

---

## llama.cpp

## Summary

llama.cpp is recommended for local-first, quantized models, laptops, and edge devices.

It requires GGUF-format models.

## Best For

Use llama.cpp when:

* local-first execution matters,
* quantized models are available,
* running on laptops or edge devices,
* attempting the Llama Champion bonus quest,
* building an offline or semi-offline experience.

## Strengths

* Good for local-first apps.
* Good for quantized models.
* Useful for constrained environments.
* Strong fit for bonus quests related to local inference.

## Consideration

llama.cpp can be valuable for hackathon positioning, but it should not make the app unreliable. A stable experience is more important than chasing a bonus quest.

---

# 8. Model Selection Guidance by Project Type

## For Tiny Court of Everyday Crimes

Recommended model direction:

* primary text model: MiniCPM4.1-8B
* optional visual evidence: MiniCPM-V 4.6
* optional verdict audio: VoxCPM2
* ambitious multimodal version: MiniCPM-o 4.5

Best MVP:

Use a strong text model first.

Add image or voice only after the courtroom interaction is polished.

The winning version depends more on interaction design than model complexity.

## For The Bureau of Lost Things

Recommended model direction:

* primary text model: MiniCPM4.1-8B
* optional image input: MiniCPM-V 4.6
* optional audio narration: VoxCPM2

Why:

The app needs creative writing, structured case files, invented departments, and personalized absurdity.

## For ShiftSync Messenger

Recommended model direction:

* primary text model: MiniCPM4.1-8B
* possible smaller version: MiniCPM5-1B
* optional screenshot parsing: MiniCPM-V 4.6

Why:

The app needs extraction, normalization, schedule reasoning, conflict detection, and message drafting.

## For LeaseLens Local

Recommended model direction:

* document/image understanding: MiniCPM-V 4.6
* structured explanation: MiniCPM4.1-8B

Why:

The app needs OCR, clause extraction, summarization, deadlines, and grounded explanation.

## For RepairScout

Recommended model direction:

* manual or image understanding: MiniCPM-V 4.6
* reasoning and triage: MiniCPM4.1-8B

Why:

The app needs to read manuals, interpret photos, and turn symptoms into safe next steps.

---

# 9. Recommended Model Strategy for the Hackathon

## Best Practical Strategy

Start with MiniCPM4.1-8B for the core experience.

It is likely the best balance between capability, speed, and small-model alignment.

Then add one secondary modality only if it clearly improves the app:

* add MiniCPM-V 4.6 if image input is essential,
* add VoxCPM2 if voice makes the experience more delightful,
* consider MiniCPM-o 4.5 only if the app is designed around live multimodal interaction.

## Best Strategy for Tiny Court

Build the MVP around text first:

1. complaint intake,
2. charges,
3. prosecution,
4. defense,
5. evidence cards,
6. witness testimony,
7. objection,
8. verdict,
9. sentence,
10. court record.

Then add optional image evidence with MiniCPM-V 4.6.

Then add optional spoken verdict with VoxCPM2.

Do not start with full multimodal complexity. Start with the comedy loop.

## Best Strategy for Backyard AI

Use the smallest model that reliably solves the real user’s problem.

For practical apps, the model should support:

* extraction,
* summarization,
* rewriting,
* classification,
* structured output.

Use image models only when the real user’s input includes screenshots, receipts, forms, leases, manuals, or photos.

## Best Strategy for Thousand Token Wood

Use the model that makes the experience most delightful.

For playful apps, the model should support:

* character voice,
* surprise,
* personalization,
* structured fiction,
* short interactive scenes,
* final artifacts.

The model should not just generate text. It should power the magic.

---

# 10. Decision Matrix

## Choose MiniCPM5-1B if:

* the app is simple,
* speed matters,
* local-first matters,
* the task is short text generation or classification,
* you want a Tiny Titan angle.

## Choose MiniCPM4.1-8B if:

* the app needs reasoning,
* the app needs structured output,
* the app has multiple steps,
* the app uses agents or roles,
* the app needs better writing quality,
* you want the safest general-purpose choice.

## Choose VoxCPM2 if:

* voice is central to the experience,
* characters should speak,
* audio improves the demo,
* the app is a storyteller or companion.

## Choose MiniCPM-V 4.6 if:

* users upload images,
* users upload screenshots,
* users upload documents,
* OCR matters,
* visual evidence or visual understanding improves the app.

## Choose MiniCPM-o 4.5 if:

* the app is truly multimodal,
* live interaction matters,
* the user should speak, show, and listen,
* the added complexity is justified by the experience.

---

# 11. Final Recommendation

For the current proposed project, Tiny Court of Everyday Crimes, the recommended model plan is:

## MVP

Use MiniCPM4.1-8B for the core courtroom experience.

## Strong Upgrade

Add MiniCPM-V 4.6 for photographic evidence.

## Delight Upgrade

Add VoxCPM2 for spoken judge verdicts.

## Ambitious Version

Use MiniCPM-o 4.5 only if the team wants to build a live voice-and-vision courtroom.

The winning path is not maximum complexity.

The winning path is:

* fast first interaction,
* funny trial,
* clear buttons,
* strong visual identity,
* shareable final verdict,
* reliable demo.

Build the courtroom first.

Add modalities only when they make the court more fun.
