import { EditionSchema } from "../../schemas/edition.js";

const validateEdition = (edition) => {
  const result = EditionSchema.safeParse(edition);

  if (!result.success) {
    throw new Error('Generated edition failed validation');
  }

  return result.data;
}

export { validateEdition };