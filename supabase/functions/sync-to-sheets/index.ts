import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// החלפנו את ה-import לכאן כדי למנוע את השגיאה שקיבלת ב-Logs
import { GoogleAuth } from "npm:google-auth-library@10.3.0";

// משתני סביבה מה-Secrets של Supabase
const serviceAccountEmail = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_EMAIL")!;
const privateKey = Deno.env.get("GOOGLE_PRIVATE_KEY")!.replace(/\\n/g, "\n");
const spreadsheetId = Deno.env.get("SPREADSHEET_ID")!;

serve(async (req) => {
  try {
    // קבלת המידע מה-Webhook
    const body = await req.json();
    const { type, record } = body;

    // הפונקציה תרוץ רק כשיש הוספה או עדכון בטבלה
    if (type !== "INSERT" && type !== "UPDATE") {
      return new Response(JSON.stringify({ message: "Ignored event type" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // אימות מול גוגל - שימוש ב-JWT
    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccountEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // הכנת השורה להוספה לאקסל (השדות שלך מהטבלה)
    const values = [[
      record.full_name,
      record.phone,
      record.attending,
      record.guests_count,
      record.needs_parking // הוספתי גם את זה כי הוא מופיע בטבלה שלך
    ]];

    // קריאה ל-Google Sheets API להוספת שורה (Append)
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Google Sheets API error details:", errorData);
      return new Response(JSON.stringify({ error: "Failed to append to sheet", details: errorData }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error processing webhook:", error.message);
    return new Response(JSON.stringify({ error: "Internal server error", message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});