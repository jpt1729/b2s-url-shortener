import { redirect, notFound } from "next/navigation";
import Airtable from "airtable";
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "appd18nRei0sIXoka"
);
export async function GET(request, params) {
  const id = params.params.id;
  let records;
  try {
    // Search for a specific row by the "Name" field
    records = await base('urls')
      .select({
        filterByFormula: `{name} = "${id}"`, // Adjust field name as needed
      })
      .firstPage();

    if (records.length === 0) {
      return notFound();
    }
    
  } catch (error) {
    console.error(error);
    return notFound();
  } finally {
    redirect(records[0]._rawJson.fields.link);
  }
}
