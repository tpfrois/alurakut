import { SiteClient } from "datocms-client";

const client = new SiteClient(process.env.CMS_KEY);

const MODEL_ID = "966392";

const getCommunities = async () => {
  const records = await client.items.all({
    filter: {
      type: MODEL_ID,
    },
  });

  return records;
};

const createCommunity = async community => {
  const record = await client.items.create({
    itemType: MODEL_ID,
    ...community,
  });

  return record;
};

export default async function handler(req, res) {
  console.log("Request received - ", req.method);

  const methods = {
    GET: async () => {
      return await getCommunities();
    },
    POST: async () => {
      return await createCommunity(req.body);
    },
  };

  const data = await methods[req.method]();
  res.json({
    communities: data,
  });
}
