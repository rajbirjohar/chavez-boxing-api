import {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionConfig,
} from "payload/types";
import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";

const afterChangeHook: CollectionAfterChangeHook = async ({
  doc, // full document data
  req, // full express request
  previousDoc, // document data before updating the collection
  operation, // name of the operation ie. 'create', 'update'
}) => {
  const deployHookUrl = `${process.env.DEPLOY_HOOK_URL}`;
  if (!deployHookUrl) {
    console.error("No frontend deploy hook URL provided.");
    return doc;
  }
  try {
    await fetch(deployHookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Frontend rebuild triggered successfully from Change Hook.");
    return doc;
  } catch (error) {
    console.error("Error triggering frontend rebuild:", error);
  }
};

const afterDeleteHook: CollectionAfterDeleteHook = async ({
  doc, // full document data
}) => {
  const deployHookUrl = `${process.env.DEPLOY_HOOK_URL}`;
  if (!deployHookUrl) {
    console.error("No frontend deploy hook URL provided.");
    return doc;
  }
  try {
    await fetch(deployHookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Frontend rebuild triggered successfully from Delete Hook.");
    return doc;
  } catch (error) {
    console.error("Error triggering frontend rebuild:", error);
  }
};

const Recipes: CollectionConfig = {
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return !!user;
    },
    update: ({ req: { user } }) => {
      return !!user;
    },
    delete: ({ req: { user } }) => {
      return !!user;
    },
  },
  hooks: {
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
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
