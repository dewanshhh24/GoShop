'use server';

/**
 * @fileOverview This file implements the AI flow for suggesting related products based on user viewing history.
 *
 * - suggestRelatedProducts - A function that takes user viewing history and returns a list of suggested related products.
 * - SuggestRelatedProductsInput - The input type for the suggestRelatedProducts function.
 * - SuggestRelatedProductsOutput - The return type for the suggestRelatedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedProductsInputSchema = z.object({
  viewingHistory: z
    .array(z.string())
    .describe('An array of product IDs representing the user viewing history.'),
});
export type SuggestRelatedProductsInput = z.infer<
  typeof SuggestRelatedProductsInputSchema
>;

const SuggestRelatedProductsOutputSchema = z.object({
  suggestedProducts: z
    .array(z.string())
    .describe('An array of product IDs representing the suggested related products.'),
});
export type SuggestRelatedProductsOutput = z.infer<
  typeof SuggestRelatedProductsOutputSchema
>;

export async function suggestRelatedProducts(
  input: SuggestRelatedProductsInput
): Promise<SuggestRelatedProductsOutput> {
  return suggestRelatedProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelatedProductsPrompt',
  input: {schema: SuggestRelatedProductsInputSchema},
  output: {schema: SuggestRelatedProductsOutputSchema},
  prompt: `You are an expert shopping assistant. Given the user's viewing history, suggest other products that the user might be interested in.

Viewing History: {{#each viewingHistory}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Suggest related products in an array of product IDs.`,
});

const suggestRelatedProductsFlow = ai.defineFlow(
  {
    name: 'suggestRelatedProductsFlow',
    inputSchema: SuggestRelatedProductsInputSchema,
    outputSchema: SuggestRelatedProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
