import { CollectionConfig } from "payload/types";
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";

const Recipes: CollectionConfig = {
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      console.log(user);
      return true;
    },
  },
  slug: "recipes",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "ingredients",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    {
      name: "instructions",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML("ingredients", {
      name: "ingredients_html",
    }),
    lexicalHTML("instructions", {
      name: "instructions_html",
    }),
  ],
};

export default Recipes;
