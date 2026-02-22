// Structured prompts for AI angle generation using all frameworks

export const FRAMEWORKS = {
  FIFTEEN_STEP: `
15-Step Angle Generation Framework:

1. Explain what your product does in the simplest possible terms.
2. Choose 2 of its features, and for each feature, explain the benefit. "Padded leather seats" is a feature. "Comfortable for long drives" is a benefit.
3. Think of 2 groups of people who might use it. Write a specific angle targeting just them for each group.
4. What's something that people are afraid of that this product could prevent? Write an angle around that.
5. Pick a superhero. If he or she had to run an affiliate campaign for this product, how would they sell your product?
6. Come up with two of the worst ideas to sell this product you can. Boring, offensive, stupid, whatever. Find a way to make them - or an idea that riffs off them - a vaguely plausible angle.
7. Who is responsible for the bad thing this product solves? Write an angle around them.
8. What about the prospect's life without this product makes them sad? Write about that.
9. Google competing products. Find the two most common complaints about them that your product could solve in some way. Write two angles explaining how your product doesn't have those problems.
10. How would your country's government sell this product?
11. Take your benefits. Then imagine the customer saying "But why does that help me?" Answer them. Then imagine they say that again. Answer them again.
12. Think of two people you know personally who might use this. How would you sell it to them, and just them?
13. Look up the current news for the country you're targeting. How can you tie this product into what's going on there right now?
14. How can you present the product as scarce or urgent?
15. What's novel about the product? Write it as a NEW or BREAKING NEWS angle.
`,

  SEVEN_DEADLY_SINS: `
7 Deadly Sins Framework (for aggressive marketing angles):

- SLOTH: Many singles have legitimate reasons for not meeting enough members of the opposite sex. "Oh, I never get time to socialise outside work." For these users, frank and to the point is the way. A sloth responds to instant results.

- GREED: Dating sites give keyboard charmers the opportunity to test-drive seduction techniques on large samples of women. Online dating to a man, is what Pick 'n' Mix was to a child.

- ENVY: Envy is a natural by-product of dating sites where the women are severely outnumbered by guys actively messaging them. A lot of men are competing with each other.

- ACEDIA: Acedia is the overwhelming feeling of listlessness. Which is how a lot of singles feel about their love lives when making the decision to join a dating site.

- PRIDE: Pride is the most dangerous sin of all, and it goes hand in hand with bitterness. If a man's pride is at stake, persuasion is simply a case of channeling the raw inevitable. Perfect for recent divorcees.

- WRATH: Dating sites can be infuriating for Alpha Males who aren't used to dealing with women who have the time and space to say "No!" to their relentless advances.

- GLUTTONY: (Adapt creatively to the product context)

- VANITY: Vanity is a quality nestled in just about every idiot who ever joined a platform and posted endless surveys. It's a textbook exercise in the art of convincing yourself that somebody gives a crap.
`,

  WRITING_GREAT_LEADS: `
Writing Great Leads Framework:

The Rule of One - Every great promotion has, at its core, a single powerful IDEA with:
- One good idea
- One core emotion
- One captivating story
- One single, desirable benefit
- One inevitable response

Awareness Levels:
1. MOST AWARE: Your prospect knows your product and only needs to know "the deal" - Use Direct leads
2. PRODUCT AWARE: Your prospect knows what you sell, but isn't sure it's right for him - Focus on proving you can solve his problem
3. SOLUTION AWARE: Your prospect knows the result he wants but not that your product provides it - Need education before comparing options
4. PROBLEM AWARE: Your prospect senses he has a problem but doesn't know there's a solution - Sympathize with their pain
5. UNAWARE: No knowledge of anything except perhaps his own identity or opinion

Six Types of Leads:

1. OFFER LEAD: Direct appeal - straight to the deal. Always mention the product, the price, discounts, premiums, guarantee and deal elements very early.

2. PROMISE LEAD: Opens with the product's best & biggest claim - The big promise is your headline, your first line and often the last line too.

3. PROBLEM-SOLUTION LEAD: Delay any talk of the product at first and instead lead off by identifying the prospect's biggest, most emotionally charged and relevant issue. Promise related to the product immediately follow.

4. BIG SECRET LEAD: The tease of hard to come by knowledge, formula or system leads the promo. The secret can either be a solution of hidden problem or a system for getting consistently good results.

5. PROCLAMATION LEAD: Indirect. Seeks to jar the 'unaware' reader out of his seat - with a factoid that's just incredible or with a shocking future forecast or prediction or maybe with a bold statement.

6. STORY LEAD: Most indirect way to open a sales letter, but also one of the most consistently powerful. Testimonials, Bios, historical proof, track record - all yield story leads.
`
};

export const BIG_MARKETING_IDEA_FORMULA = `
Big Marketing Idea Formula Checklist:

1. Emotionally Compelling (Primary Promise + Unique Mechanism) + Intellectually Interesting = Big Marketing Idea

2. EC = Emotionally Compelling
   - When it is built on a Primary promise and when that promise is delivered by a Unique mechanism

3. PP = Primary Promise
   - Tells the prospect what they stand to gain by engaging with your marketing message
   - It tells them how their life will be transformed for the better
   - We are not talking about the product benefit - we are talking about the one, big overarching promise of change, of transformation, of result, of outcome
   - To be effective, the Primary promise needs to be big, bold and audacious
   - Exciting enough for prospects to want to dive deeper and learn more
   - Compelling enough for prospects to see the value in swapping their time to hear more about it
   - To make it believable, it needs to be specific and concrete - i.e it can't be vague and general
   - Also to make the primary promise believable it needs to be backed up by proof
   - Primary promise should never be bigger than the biggest proof point we have
   - The bigger, better the proof - the bigger the promise can be

4. UM = Unique Mechanism
   - Is the unique piece, part, component, aspect, process or system behind your product which delivers the primary promise
   - It gives them hope that maybe this time...with your product or service...they will experience the result
   - It gives them hope because they view the Unique mechanism as the thing they've been missing

5. Types of Unique Mechanisms:
   - Actual mechanism: When you actually have a unique piece, part, component, process, system behind the product
   - Unspoken mechanism: The mechanism isn't necessarily unique but something that no one is actually talking about
   - Transubstantiation mechanism: Turning something ordinary into something extraordinary

6. II = Intellectually Interesting
   - When the idea piques the prospect's curiosity and gives them a feeling of discovery
   - Makes them feel as if they've just stumbled on something newsworthy
   - Something they'd be interested in hearing more about even if there was no Primary promise or Unique mechanism
   - Gives your prospect a feeling of discovery
   - AHA moment - as if they just stumbled on something newsworthy
`;

export function getAngleGenerationPrompt(productDescription: string, frameworks?: string[]): string {
  const selectedFrameworks = frameworks || ['FIFTEEN_STEP', 'SEVEN_DEADLY_SINS', 'WRITING_GREAT_LEADS'];
  
  let prompt = `You are an expert copywriter helping to generate marketing angles and advertising ideas for a product.

Product Description:
${productDescription}

Use the following frameworks to generate creative, compelling marketing angles:

`;

  if (selectedFrameworks.includes('FIFTEEN_STEP')) {
    prompt += FRAMEWORKS.FIFTEEN_STEP + '\n\n';
  }
  
  if (selectedFrameworks.includes('SEVEN_DEADLY_SINS')) {
    prompt += FRAMEWORKS.SEVEN_DEADLY_SINS + '\n\n';
  }
  
  if (selectedFrameworks.includes('WRITING_GREAT_LEADS')) {
    prompt += FRAMEWORKS.WRITING_GREAT_LEADS + '\n\n';
  }

  prompt += `
Generate 5-10 diverse marketing angles for this product. For each angle:
1. State the angle clearly
2. Indicate which framework(s) inspired it
3. Explain why it would be compelling to the target audience

Be creative, specific, and focus on emotional triggers that would make prospects want to engage.
`;

  return prompt;
}

export function getEvaluationPrompt(idea: string, productDescription: string): string {
  return `You are evaluating a marketing angle using the Big Marketing Idea Formula.

Product Description:
${productDescription}

Marketing Angle to Evaluate:
${idea}

${BIG_MARKETING_IDEA_FORMULA}

Evaluate this angle step by step. For each criterion, provide:
1. A score from 1-10
2. Specific reasoning for that score
3. Suggestions for improvement if the score is below 8

Focus on:
- Is there a clear Primary Promise? Is it big, bold, specific, and backed by proof?
- Is there a Unique Mechanism? Is it compelling and believable?
- Is it Intellectually Interesting? Does it create curiosity and a feeling of discovery?
- Overall: Does it meet the formula of EC (Emotionally Compelling) + II (Intellectually Interesting)?

**IMPORTANT: At the end of your evaluation, you MUST provide:**
1. An **Overall Rating** on a scale of 1-10 (where 10 is exceptional)
2. **Improvement Feedback** - specific, actionable suggestions on what can be improved to raise the rating

Format your response clearly with sections for each criterion, followed by a final "Overall Rating" and "Improvement Feedback" section.`;
}

export function getPostEvaluationAnglePrompt(
  productDescription: string,
  evaluatedIdea: string,
  evaluationResults: string
): string {
  return `Based on the evaluation of a previous marketing angle, generate 2 new, improved marketing angles that address the weaknesses identified and incorporate the improvement feedback.

Product Description:
${productDescription}

Previously Evaluated Angle:
${evaluatedIdea}

Evaluation Results:
${evaluationResults}

Generate 2 new marketing angles that:
1. Address the specific weaknesses identified in the evaluation
2. Incorporate the improvement feedback provided
3. Score higher on the Big Marketing Idea Formula (aim for 8-10 rating)
4. Are creative, compelling, and ready to use

For each new angle:
- State the angle clearly
- Explain how it addresses the previous weaknesses
- Indicate which framework(s) it uses
- Explain why it would score higher than the previous angle

Make these angles polished and ready for implementation.`;
}
